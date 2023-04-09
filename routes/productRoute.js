const express=require("express");
const { fetchProduct, fetchStats, barChart, piChart, allapi} = require("../controllers/productController");




const router=express.Router();
 
// all routes 
router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });
// get all products
router.route("/seed").get(fetchProduct)
router.route("/statistics").get(fetchStats)
router.route("/barchart").get(barChart)
router.route("/pichart").get(piChart)
router.route("/allreturn").get(allapi)







module.exports=router; 