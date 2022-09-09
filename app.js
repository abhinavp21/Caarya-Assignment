require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const createToken = require("./generateToken");
const User = require("./models/User");
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const authorize = reuire("./middleware/authorizeRequest.js");
const port = process.env.PORT || 8000
const multer = require('multer')
var multiparty = require('multiparty');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use("/users", authRoutes);


mongoose.connect(process.env.URI
    , (err) => {
        if (err)
            console.log(err);
        else
            console.log("connected to mongodb");
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        })
    });

app.get("/", (req, res) => {
    // auth -> accordingly
    // else -> login
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body
    var token;
    try {
        if (username && password) {
            if (username == "admin") {
                if (password == "admin")
                    token = createToken({ role: "admin" })
                else
                    throw Error("incorrect password for admin")
            }
            else {
                const user = await User.findOne({ username });
                if (user) {
                    const auth = await bcrypt.compare(password, user.password);
                    if (!auth)
                        throw Error("incorrect password for user")
                    token = createToken({ role: "user", id: user._id });
                }
                else
                    throw Error("incorrect username")
                // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            }
            res.status(200).json(token);
        }

    }
    catch (err) {
        res.status(400).json(err);
    }

})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

app.patch("/user/:id", authorize("user"), (req, res) => {
    form.parse(req, function (err, fields, files) {
        if (files != null) {
            const tempFiles = []
            upload.array('blogFiles', 12)
            files.blogFiles.forEach(file => {
                tempFiles.push({
                    name: file.originalFilename,
                    location: path.join(__dirname + "/uploads") + file.originalFilename
                })
            })

        }
        User.findByIdAndUpdate()
    });
})