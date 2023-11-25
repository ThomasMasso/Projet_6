const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)
.is().max(40)
.has().uppercase()
.has().lowercase()
.has().digits(1)
.has().symbols(1)
.has().not().spaces();

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({ error: `Le mot de passe doit contenir au moins 8 caractères dont: une minuscule, une majuscule, un chiffre, et un symbole :` + passwordSchema.validate(req.body.password, { list: true })} );
    }
};