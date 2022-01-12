const router=require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcrypt");
const Post=require("../models/Post");


// UPDATE
router.put("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id){
        //params is for parameter you pass like here it is id .
        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt);
        }
        try{
            const updateUser=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{new:true});
            res.status(200).json(updateUser);

            } catch(err){
                res.status(500).json(err)
        }
     } else{
         res.status(401).json("you can update only your account !");

     }
});


// DELETE
router.delete("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id)
    {
        try{
        // this is to delete post
            const user=await User.findById(req.params.id)
            try{
                await Post.deleteMany({username:user.username});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted...")
                // here we are deleting the user but his post will not get deleted
            }
            catch(err)
            {
                res.status(500).json(err)
            }

        }
        catch(err)
        {
            res.status(404).json("User not found")

        }
    } 
     else
     {
         res.status(401).json("you can DELETE only your account !");

     }
});


//GET USER
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports=router;