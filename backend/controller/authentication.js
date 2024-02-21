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
        const uniqueUserName = await User.findOne({ username });
        if(uniqueUserName){
            return res.status(200).json({ message: "Username taken, try different !" });
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
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
        return res.status(200).json({ message: "User not found !" });
    }
    bcrypt.compare(password, userDetails.password, function (err, result) {
        if (!err) {
            const user = {
                _id : userDetails._id,
                username : userDetails.username,
                name : userDetails.name,
                email : userDetails.email
            }
            if (result) {
                res.status(200).json({ message: "User Logged In!", user });
            }else{
                res.status(401).json({ message: "Invalid Credentials!" });
            }
        } else {
            res.status(501).json(err);
        }
    })
    // res.send("success");
}