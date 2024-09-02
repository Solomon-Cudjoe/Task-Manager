const { Router } = require("express");
const { signUp, login, getToken, verifyUser, forgotPassword, resetPassword, editProfile } = require('../Controllers/auth');
const router = Router();

router.post('/signUp', signUp);
router.post("/login", login);
router.get("/get-token/:email", getToken);
router.put("/verify-user/:token", verifyUser);
router.get("/forgot-password/:email", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.put("/:userEmail", editProfile);

module.exports = router;
