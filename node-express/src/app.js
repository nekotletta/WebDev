const express = require('express');
const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const educationRoutes = require('./routes/educationRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();
const version = 'v1';

app.use(express.json());
app.use(`/api/${version}/users/`, userRoutes);
app.use(`/api/${version}/skills/`, skillRoutes);
// app.use(`/api/${version}/experience/`, experienceRoutes);
// app.use("/api/education/", educationRoutes);
// app.use("/api/portfolio/", portfolioRoutes);

module.exports = app;