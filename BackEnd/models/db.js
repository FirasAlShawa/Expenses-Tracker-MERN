const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ExpensesTracker",{useNewUrlParser:true},(err)=>{
    if(!err){
        console.log("My Message : MonogoDB Connection Succeeded... !");
    }else{
        console.log("My Message : Error => " + err);
    }
});

require("./expense.model");