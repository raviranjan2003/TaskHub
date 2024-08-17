const express = require('express');
const authentication = require('../controller/authentication');
const router = express.Router();
const { isAuth } = require('../middleware/isAuth');

router.post("/sign-up",authentication.SignUp);
router.post("/sign-in",authentication.SignIn);
router.get("/get-user",isAuth,authentication.GetUser);

module.exports = router;