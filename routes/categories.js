const router=require("express").Router();
const Category=require("../models/Category");


 
// create CATEGORY
router.post("/",async(req,res)=>{
    const newCate=new Category(req.body);
    try{
        const savedCate=await newCate.save();
        res.status(200).json(savedCate);
    }catch(err){
        res.status(500).json(err);
    }
});

// GET ALL CATEGORIES
router.get("/",async(req,res)=>{
    try{
        const cats=await Category.find();
        res.status(200).json(cats);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports=router;
