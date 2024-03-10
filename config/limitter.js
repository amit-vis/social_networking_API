const ratelimit = require('express-rate-limit');

// here we have set out limitter
const limitter= ratelimit({
    windowMs: 100*60*1000,
    limit: 1000,
    message: "Too many request from this please try again latter"
})

module.exports = limitter;