const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../model/users');
const jwt = require('jsonwebtoken');
// const SECRET_KEY = "Thisismysecretkey";

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
    try {
        const userDetails = await User.findOne({ email });

        if (!userDetails) {
            return res.status(200).json({ message: "User not found !" });
        }
        // bcrypt.compare(password, userDetails.password, function (err, result) {
        //     if (!err) {
        //         const token = jwt.sign({id:userDetails._id, email:userDetails.email},SECRET_KEY);
        //         const user = {
        //             _id : userDetails._id,
        //             username : userDetails.username,
        //             name : userDetails.name,
        //             email : userDetails.email,
        //             token
        //         }
        //         if (result) {
        //             res.status(200).json({ message: "User Logged In!", user });
        //         }else{
        //             res.status(401).json({ message: "Invalid Credentials!" });
        //         }
        //     } else {
        //         res.status(501).json(err);
        //     }
        // })
        userDetails.password = null;
        const token = jwt.sign({user : userDetails }, process.env.SECRET_KEY, { expiresIn: '1h' });
        
        res.cookie('token', token, {
          httpOnly: true, // Prevents JavaScript access to the cookie
        //   secure: process.env.NODE_ENV === 'production', // Set to true in production
          sameSite: 'Strict', // Helps prevent CSRF attacks
        });

        res.status(200).json({ message : "Login Successfully !"});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Something Went Wrong !"});
    }
    // res.send("success");
}

module.exports.GetUser = async (req, res) => {
    res.status(200).json(req.user);
}