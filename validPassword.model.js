const passwordValidator = require("password-validator")
const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(7)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces()
    .has().symbols(1)

module.exports = passwordSchema
