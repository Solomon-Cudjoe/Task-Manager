const { Router } = require("express");
const { signUp, login, getToken, verifyUser, forgotPassword, resetPassword, editProfile, google, authenticate, logout, isAuth } = require('../Controllers/auth');
const router = Router();

router.post('/signUp', signUp);
router.get('/authenticate', isAuth, authenticate);
router.post("/login", login);
router.get("/get-token/:email", getToken);
router.put("/verify-user/:token", verifyUser);
router.get("/forgot-password/:email", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.put("/:userEmail", editProfile);
router.get("/oauth/google", google);
router.post("/logout", logout);

module.exports = router;
