const express = require("express");
const logger = require ("./middleware/logger");
const apiKey = require("./middleware/getAPIKey");

const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const skillRoutes = require("./routes/skillRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const educationRoutes = require("./routes/educationRoutes");
const profileRoutes = require('./routes/profileRoutes');

const version = "v1";
const app = express();

app.use(express.json());
app.use(logger)
app.use(apiKey)

app.use(`/api/${version}/users`,userRoutes);
app.use(`/api/${version}/roles`,roleRoutes);
app.use(`/api/${version}/skills`,skillRoutes);
app.use(`/api/${version}/experience`,experienceRoutes);
app.use(`/api/${version}/education`,educationRoutes);
app.use(`/api/${version}/portfolios`,profileRoutes);

module.exports = app;