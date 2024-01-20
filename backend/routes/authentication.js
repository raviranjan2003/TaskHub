const express = require('express');
const authentication = require('../controller/authentication');
const app = express();

app.post("/sign-up",authentication.SignUp);
app.post("/sign-in",authentication.SignIn);