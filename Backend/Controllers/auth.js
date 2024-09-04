const User = require('../Models/auth');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword, generateToken, sendVerificationEmail, sendResetEmail, oauth, getGoogleUser } = require('../Helpers/auth');

exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName) {
            return res.status(404).json({ error: "First Name is required" })
        } else if (!lastName) {
            return res.status(404).json({ error: "Last Name is required" })
        } else if (!email) {
            return res.status(404).json({ error: "Email is required" })
        } else if (!password || password.length < 8) {
            return res.status(404).json({ error: 'Password is required and must be more than 8 characters' })
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(404).json({ error: "User Exists" })
        }

        const hashedPasseword = await hashPassword(password);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPasseword,
            verified: false
        });

        await newUser.save();

        const { password: pwd, secret, ...rest } = newUser._doc;

        return res.status(200).json({
            message: "Sign Up Successful",
            user: rest
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message});
    }
};

exports.google = async (req, res) => {
    try {
        const { code } = req.query;
        if (!code) {
            return res.status(400).json({ error: "Authorization code is required" });
        }
        const { id_token, access_token } = await oauth(code);
        if (!id_token || !access_token) {
            return res.status(400).json({ error: "Failed to retrieve tokens from OAuth" });
        }
        const googleUser = await getGoogleUser(id_token, access_token);
        if (!googleUser || !googleUser.email) {
            return res.status(400).json({ error: "Failed to retrieve user information from Google" });
        }
        const user = await User.findOneAndUpdate({ email: googleUser.email }, {
            email: googleUser.email,
            firstName: googleUser.given_name,
            lastName: googleUser.family_name,
        }, {
            upsert: true,
            new: true
        })

        if (!user) {
            return res.status(409).json({ error: "User not found" });
        }

        req.session.isAuth = true;
        req.session.user = rest;
        res.redirect(process.env.FRONTEND_URL);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email) {
            return res.status(404).json({ error: "Email is required" });
        } else if (!password || password.length < 8) {
            return res.status(404).json({ error: 'Password is required and must be more than 8 characters' });
        }
        const exists = await User.findOne({ email });
        if (!exists) {
            return res.status(409).json({ error: "User not found" });
        }
        const match = await comparePassword(password, exists.password);

        if (!match) {
            return res.status(404).json({ error: "Password is incorrect" });
        } else {
            exists.password = undefined;
            exists.secret = undefined;
            const { password, secret, ...rest } = exists._doc;
            req.session.isAuth = true;
            req.session.user = rest;
            return res.status(200).json({
                message: "Login Successful",
                user: rest
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        return;
    }
}

exports.authenticate = async (req, res) => {
    const { user } = req.session;
    console.log({ user });
    return res.status(200).json({ user });   
}   

exports.getToken = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(409).json({ error: "User not found" });
        }

        const verificationToken = generateToken(user, "verification", "5m");
        await sendVerificationEmail(user, verificationToken);
        return res.status(200).json({ message: "Token sent to " + email });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.verifyUser = async (req, res) => {
    try {
        const { token } = req.params;
        if (!token) {
            return;
        }

        let payload;

        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
            if (payload.type !== "verification") {
                return res.status(400).json({ error: "Invalid token" });
            }
        } catch (e) {
            return res.status(400).json({ error: 'Invalid token' });
        }

        const user = await User.findById(payload._id);
        if (!user) {
            return res.status(409).json({ error: "User not found" });
        };
        if (user.verified) {
            return res.status(409).json({ error: 'User already verified' });
        };

        user.verified = true;

        await user.save();

        return res.status(200).json({ message: "Verification Successful" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(409).json({ error: "User not found" });
        }
        const resetToken = generateToken(user, "reset", "5m");
        await sendResetEmail(user, resetToken);
        return res.status(200).json({ message: "Reset password link sent to " + email });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!token) {
            return res.status(400).json({ error: 'Token is required' });
        }

        if (!password || password.length < 8) {
            return res.status(404).json({ error: 'Password is required and must be more than 8 characters' })
        }
        let payload;

        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
            if (payload.type !== "reset") {
                return res.status(400).json({ error: "Invalid token" });
            } 
        } catch(err) {
            return res.status(400).json({ error: 'Invalid token' });
        }

        const user = await User.findById(payload._id);
        if (!user) {
            return res.status(409).json({ error: "User not found" });
        };
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: "Password reset successful" }); 
    } catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
    
}

exports.editProfile = async (req, res) => {
    try {
    const { userEmail } = req.params;
    const { firstName, lastName, email, dateOfBirth } = req.body;
    const user = await User.findOne({ email: userEmail });
    console.log(user);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    if (firstName) {
        user.firstName = firstName;
    }
    if (lastName) {
        user.lastName = lastName;
    }
    if (email) {
        user.email = email;
    }
    if (dateOfBirth) {
        user.dateOfBirth = dateOfBirth;
    }

    await user.save();

    return res.status(200).json({
        message: "Successful",
        user
    })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
    
}

exports.logout = async (req, res) => {
    console.log('Session before destroy:', req.sessionID);
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: "Failed to logout" });
            }
            console.log('Session destroyed:', req.sessionID);
            res.clearCookie('connect.sid', { path: '/' });
            return res.status(200).json({ message: "Logout successful" });
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
