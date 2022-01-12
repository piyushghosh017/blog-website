const express=require("express");
const app=express();
const dotenv=require("dotenv");
const mongoose=require("mongoose")
dotenv.config();
const authRouth=require("./routes/auth");
app.use(express.json());
const cors = require('cors')
app.use(cors())
const multer=require("multer");
const userRouth=require("./routes/users");
const postRouth=require("./routes/posts");
const categoryRouth=require("./routes/categories");

const path=require("path");
app.use("/images",express.static(path.join(__dirname,"/images")));


mongoose.connect(process.env.DATABASE,{
    // useFindAndModify: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    // useCreateIndex:true
}).then(console.log("db connected"))
.catch((err)=>console.log(err));


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    },
});
const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded");
});


app.use("/api/users",userRouth);
app.use("/api/auth",authRouth);
app.use("/api/posts",postRouth);
app.use("/api/categories",categoryRouth);


app.use("/pp",(req,res)=>{
    console.log("hey this is pp url")
    res.send("from pp")
});

// app.use("/",(req,res)=>{
//     console.log("hey this is main url");
//     res.send("hiiiiii")
// });

app.listen("8000",()=>{
    console.log("listerning to port ")
});

