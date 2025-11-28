function logger(req, res, next) {
    console.log(req.method);
    console.log(req.originalUrl);

    const ip = req.headers['x-forwarded-for']?.split(',').shift() ||
    req.socket?.remoteAddress;
    console.log(ip);

    if (ip != "::1") {
        return res.status(401).json({ error: 'Invalid Referrer!' });
    }

    next();
}

module.exports = logger;