require('dotenv').config();
function getAPIKey(req, res, next) {

    const apikey = req.headers['apikey']?.split(',').shift() || '';

    if (apikey != process.env.API_KEY) {
        return res.status(401).json({ error: 'Invalid API Key!' });
    }

    next();
}

module.exports = getAPIKey;