const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../model/users');

module.exports.SignUp = async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "Email already registered !" });
        }
        bcrypt.hash(password, saltRounds, async (err, result) => {
            if (!err) {
                const newUser = new User({
                    name,
                    username,
                    email,
                    password: result
                })
                const newUserDetails = await newUser.save();
                if (newUserDetails) {
                    res.status(201).json(newUserDetails);
                } else {
                    res.status(501).json({ message: "Error while signUp" })
                }
            } else {
                res.status(501).json(err);
            }
        })
    } catch (error) {
        res.status(501).json({ error });
    }
}


module.exports.SignIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.send(200).json({ message: "User not found !" });
    }
    bcrypt.compare(password, user.password, function (err, result) {
        if (!err) {
            if (result) {
                console.log("User Logged In !");
                res.status(200).json({ message: "User Logged In!" });
            }else{
                res.status(401).json({ message: "Invalid Credentials!" });
            }
        } else {
            res.status(501).json(err);
        }
    })
    // res.send("success");
}