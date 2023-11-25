const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const passwordValidate = require('../middleware/password-validator');

// limiter attaques force brute
const rateLimit  = require('express-rate-limit');
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

router.post('/signup', passwordValidate, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);


module.exports = router;