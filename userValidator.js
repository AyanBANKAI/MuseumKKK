const passwordSchema = require("./validPassword.model")


class UserValidator {
    isPasswordValid(password){
        const isValid = passwordSchema.validate(password);
        return isValid;
    }
}

module.exports = new UserValidator();