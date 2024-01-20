const express = require('express');
const app = express();

app.use("/auth",require('./authentication'));