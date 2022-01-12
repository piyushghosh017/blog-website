const router=require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcrypt");
// Register
router.post("/register", async (req,res)=>{
    try{
        // const newUser=new User(req.body)
        // OR
        const salt=await bcrypt.genSalt(10);
        const hashedPass=await bcrypt.hash(req.body.password,salt); //new password
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            // password:req.body.password,
            password:hashedPass,

        })
        const user= await newUser.save();
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err)
    }
})
// req is waht we sending to server like username , password email etc
// res res is response like warning success fail



//Login
router.post("/login",async (req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username});
        !user && res.status(400).json("wrong credential");

        const validated= await bcrypt.compare(req.body.password,user.password)
        !validated && res.status(400).json("wrong credential");

        // to prevent from password to show
        // const{passowrd,...others}=user; //this will show every thing about user except password 
        const{password, ...others}=user._doc; // to know email username id !
        // res.status(200).json(user);
        res.status(200).json(others);

    }catch(err){
        res.status(500).json(err);
    }
});


module.exports=router;