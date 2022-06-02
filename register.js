const express = require('express');
const router = express.Router();
const alert = require("./user.model");
const User = require("./user.model")
const bcrypt = require("bcryptjs");
const UserValidator = require("./userValidator")

router
    .get("/register", (req, res) => {
        res.render("register");
    })
    .post("/register/auth", async (req, res)=> {
        const email = req.body.email;
        const name = req.body.name;
        const city = req.body.city;
        const password = req.body.password;
        const passwordRepeat = req.body.passwordConfirm;

        try {
            if (password == passwordRepeat) {
                const isPasswordValid = UserValidator.isPasswordValid(password);

                if (isPasswordValid) {
                    const cryptedPassword = await bcrypt.hash(password, 10);

                    await User.create({
                        userName: name,
                        userEmail: email,
                        userCity: city,
                        userPassword: cryptedPassword,
                        isAdmin: false,
                    });
                    res.redirect("/login");
                } else alert("The password is invalid");
            } else alert("Passwords didn't match");
        } catch (error) {
            alert(error);
            res.redirect("/register");
        }
    });

module.exports = router;



