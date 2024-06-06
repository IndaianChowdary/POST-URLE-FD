let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
let multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,"uploads")
    },
    filename: function (req, file, cb) {
        console.log(file)
      cb(null, `${Date.now()}${file.originalname}`);
    }
  })
  
  const upload = multer({ storage: storage });

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


let userSchema = new mongoose.Schema({
firstName:String,
lastName:String,
email:String,
password:String,
mobile:Number,
gender:String,
profilePic:String,

})

let User = new mongoose.model("user",userSchema);

app.post("/register",upload.single("profilePic"), async(req,res)=>{
console.log(req.file)
    console.log(req.body);
try {
    
let newUser = new User({

    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    password:req.body.Password,
    mobile:req.body.mobile,
    gender:req.body.gender,
    profilePic:req.file.path,
    
    });
    
   await User.insertMany([newUser]);
    res.json({status:"sucess",msg:"user created"})
    
} catch (err) {
    res.json({status:"Failed" ,msg:"unable to create" , err:err});
}




console.log(req.body)

})

app.listen(1947,()=>[
    console.log("port is listing to 1947")
])



let connectToMDB = async ()=>{

try {
    await mongoose.connect("mongodb://localhost:27017/SignUp?");
    
    console.log("successfully connected to DataBase");
} catch (error) {
    console.log("unable to connect ")
}

}

connectToMDB();