const expresss= require('express');
const app=expresss();
const cookieParser=require("cookie-parser")
const bodyParser= require("body-parser")
const fileUpload=require("express-fileupload")
const dotenv=require("dotenv")

var cors = require('cors');

app.use(cors())

app.use(cors({
    credentials: true, 
    origin:true
    
}));


app.use(expresss.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

// config 
dotenv.config({path:"config/config.env"}) 

// route imports 
const product= require("./routes/productRoute");




// routes 
app.use("/api/v1",product);




module.exports=app;