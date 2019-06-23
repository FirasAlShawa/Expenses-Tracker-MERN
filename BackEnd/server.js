require("./models/db");

const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const PORT = 4000 ;

const cors = require("cors");

const ExpenseRouter = express.Router();

const Year = require("./models/year.model");
const Month = require("./models/Month.model");
const Expense = require("./models/expense.model");

app.use(cors(),bodyParser.json());


ExpenseRouter.get("/",(req,res)=>{
    res.json({message:"Hi from / Router"});
});

// ExpenseRouter.get("/update",(req,res)=>{
//     Expense.find({Year:"2019","Months.Month":"June"},{"Months.$":3},(err,doc)=>{
//         if(!err){
//             res.json(doc);
//         }else{
//             res.json({"Messages" : err});
//         }
//     });
// });

ExpenseRouter.get("/d",(req,res)=>{
   
    Expense.findOne({Year:req.body.Year},(err,doc)=>{
        if(doc==null){
            let expense = new Expense(req.body);
            expense.save().then(expense=>{
                res.status(201).json({"State":"Obejct is add ... !"})
              
            }).catch(err=>{
                res.status(400).send("Error :  "+err);
            });
            return 0;
        }
        var MyExpense = {
            Month:req.body.Months[0].Month,
            Type:req.body.Months[0].Type,
            Amount:req.body.Months[0].Amount,
        }
        
        doc.Months.map(myDoc=>{
            if(myDoc.Type != MyExpense.Type ){
                doc.Months.push(MyExpense);
                console.log(myDoc.Type == MyExpense.Type )
            }
        });


        doc.save().then(ex=>{
            res.status(203).json(doc.Months)
        }).catch(err=>{
            res.status(400).send(err);
        })
    });
});




ExpenseRouter.post("/add",(req,res)=>{
    let expense = new Expense(req.body);
    expense.save().then(expense=>{
        res.status(200).json({"State":"Obejct is add ... !"})
    }).catch(err=>{
        res.status(400).send("Error :  "+err);
    });
});

ExpenseRouter.post("/AddAndUpdate",(req,res)=>{
    let ex = new Expense(req.body);
    Expense.findOne({"Year":req.body.Year,"Month":req.body.Month,"Category":req.body.Category},(err,doc)=>{
        if(!doc){
            let expense = new Expense(req.body);
            expense.save().then(expense=>{
                res.status(200).json({"State":"Obejct is add ... !"})
            }).catch(err=>{
                res.status(400).send("Error :  "+err);
            });
        }
        else{
            doc.Amount = req.body.Amount;
            console.log(doc)

            doc.save().then(doc=>{
                res.json(doc);
            }).catch(err=>{
                res.status(400).send("Update is not Possible");
            })
        }
   });
});

ExpenseRouter.get("/View/:Category/",(req,res)=>{
    console.log({Month:req.params.Month},{Category:req.params.Category})
    // let expense = new Expense(req.body);
    // console.log(req.params.Category);
    // Expense.find({Category:req.params.Category,Month:req.params.Month},null,(err,doc)=>{
        Expense.find({$or:[{Month:req.params.Month},{Category:req.params.Category}]},null,(err,doc)=>{
        if(!doc){
            res.status(404).send("Data is Not found!");
        }else{
            console.log(doc)
            res.status(200).send(doc);
        }
    });
});

ExpenseRouter.get("/Gate/:Category/",(req,res)=>{
    console.log({Month:req.params.Month},{Category:req.params.Category})
    // let expense = new Expense(req.body);
    // console.log(req.params.Category);
    // Expense.find({Category:req.params.Category,Month:req.params.Month},null,(err,doc)=>{
        Expense.find({Category:req.params.Category},null,(err,doc)=>{
        if(!doc){
            res.status(404).send("Data is Not found!");
        }else{
            console.log(doc)
            res.status(200).send(doc);
        }
    });
});
// ExpenseRouter.post("/add",(req,res)=>{
//     let expense = new Expense(req.body);
//     expense.save().then(expense=>{
//         res.status(200).json({"State":"Obejct is add ... !"})
//     }).catch(err=>{
//         res.status(400).send("Not Saved!");
//     });
// });

app.use("/Expenses",ExpenseRouter);

app.listen(PORT,()=>{
    console.log("MY Message : Server is running on port 4000 !");
});

