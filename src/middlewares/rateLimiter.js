const rateLimit = require('express-rate-limit')

// 100 req per 15 min per IP

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // limit each IP
    standardHeaders: true, //return rate limit info in headers
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
});

//reports (heavy aggregation)

const reportLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max:30,
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    }
});
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max:10,
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    }
});

module.exports = {
    apiLimiter,
    authLimiter,
    reportLimiter
}