const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.SignUp = async (req,res)=>{
    const {name, username, email, password } = req.body;
    console.log(password);
    bcrypt.hash(password, saltRounds, (err, result)=>{
        if(!err){
            console.log(result);
        }else{
            res.status(501).json(err);
        }
    })
    res.send("success");
}


module.exports.SignIn = async (req,res)=>{
    const { email , password } = req.body;
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    bcrypt.compare(password,hashedPassword,function(err,result){
        if(!err){
            console.log(result);
        }else{
            res.status(501).json(err);
        }
    })
    res.send("success");
}