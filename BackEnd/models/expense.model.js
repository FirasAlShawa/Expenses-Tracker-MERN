
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Expenses = new Schema({
    Year :String,
    Month:String,
    Category:String,
    Amount:Number
});

Expenses.index({Year:1,Month:1,Category:1},{unique:true});

module.exports = mongoose.model("Expenses",Expenses);



