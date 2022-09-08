const express = require('express')
const router = express.Router()
const authorize = require("../middleware/authorizeRequest")
const User = require("../models/User")
const bcrypt = require("bcrypt")

router.get("/", authorize("admin"), (req, res) => {
    User.find({}, (err, found) => {
        if (err)
            res.status(401).json("error")
        else
            res.json(found)
    })
})
router.post('/', authorize("admin"), async (req, res) => {
    try {
        const { username, password } = req.body
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt)
        const user = new User({ username, password })
        res.json(user)
    } catch (err) {
        res.json(err)
    }

})
router.delete('/:username', authorize("admin"), (req, res) => {
    const { username } = req.params
    User.findOneAndDelete({ username }, (err, msg) => {
        if (err)
            res.send(err)
        else
            res.send(msg)
    })
})
router.patch('/:uname', authorize("admin"), (req, res) => {
    const { uname } = req.params
    const updateObj = req.body
    User.findByIdAndUpdate({ uname }, updateObj, (err, newdoc) => {
        if (err)
            res.json(err)
        else
            res.json(newdoc)
    })
})


module.exports = router