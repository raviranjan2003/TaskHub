const express = require('express');
const authentication = require('../controller/authentication');
const router = express.Router();

router.post("/sign-up",authentication.SignUp);
router.post("/sign-in",authentication.SignIn);

module.exports = router;