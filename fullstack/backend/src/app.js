const express = require("express");
const verifyJWT = require('./middleware/jwt');
const logger = require ("./middleware/logger");
const apiKey = require("./middleware/getAPIKey");
const cors = require('cors');

const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const skillRoutes = require("./routes/skillRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const educationRoutes = require("./routes/educationRoutes");
const profileRoutes = require('./routes/profileRoutes');
const authRoutes = require("./routes/authRoutes");
const degreeRoutes = require("./routes/degreeRoutes");
const messagesRoutes = require("./routes/messagesRoutes");

const version = "v1";
const app = express();

app.use(cors({
    origin: '*',
    credentials: false
}));

app.use(express.json());
app.use(logger)
app.use(apiKey)

app.use(`/api/${version}/auth`,authRoutes);
app.use(`/api/${version}/users`,verifyJWT, userRoutes);
app.use(`/api/${version}/messages`, messagesRoutes);
app.use(`/api/${version}/roles`,roleRoutes);
app.use(`/api/${version}/skills`,skillRoutes);
app.use(`/api/${version}/experience`,experienceRoutes);
app.use(`/api/${version}/education`,educationRoutes);
app.use(`/api/${version}/portfolio`,profileRoutes);
app.use(`/api/${version}/degrees`,degreeRoutes);

module.exports = app;