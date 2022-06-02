const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "views/css"));
app.use("/js", express.static(__dirname + "views/js"));
app.use("/image", express.static(__dirname + "views/image"));
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(require("./register"));
app.use(require("./login"));


runServer();

async function runServer() {
    await mongoose
        .connect(
            "mongodb+srv://qwerty:qwerty123@cluster0.e4ic0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then(() => {
            app.listen(PORT, () => {
                console.log("Running on port 8000");
            });
        });
}