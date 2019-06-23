import React ,{Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { nfapply } from "q";
class OneMonthTracker extends Component{

    Months= ["January","February","March","April","May","June","July","August","September","October","November","December"];
    date = new Date();


    constructor(props){
        super(props)

        this.state = {
            Year:this.date.getFullYear(),
            Category : this.props.match.params.Category,
            Month:this.Months[this.date.getMonth()],
            SubTotal : 0,
            Expenses : [],
            PreBtn :null,
            CurBtn :null
        }

        this.OnClickMonth = this.OnClickMonth.bind(this);
    }


    OnClickMonth = event =>{
        let Btn = event.target;
        let old = this.state.PreBtn
        // console.log(this.state.PreBtn)
        // $(event.target).css("backfround-color",)
        event.target.style.backgroundColor = "#DC3545"
        old?old.style.backgroundColor = "green":console.log(null);
        
        // console.log(event.target.value);
        // console.log(this.state.Expenses);
        let amount = 0 ;
        this.state.Expenses.map(expense=>{
            if(expense.Month == event.target.value   && expense.Year == this.state.Year){
                console.log(expense.Amount)
                console.log("True  = " + expense.Amount )
                amount=expense.Amount
              }
            });
        // console.log(this.state.SubTotal)
        this.setState({SubTotal:amount,PreBtn:event.target})

    }
    
    componentDidMount(){
        console.log(this.state.Category+"/"+this.state.Month)

        axios.get("http://localhost:4000/Expenses/Gate/"+this.state.Category).
        then(res =>{
            this.setState({Expenses:res.data})

        }).catch(err=>{
            console.log(err)
        })
    }

    render(){
        const MonthBtn = {
            borderRadius: "8px",
            backgroundColor: "green",
            color: "white",
            border: "1px green solid",
            margin: "10px",
            padding: "5px"
        }

        const BtnBack = {
            backgroundColor: "#F7BA43",
            border: "#F7BA43 1px solid",
            borderRadius:"10px",
            fontSize: "20px",
            margin: "5px",
        }
        const LabelStyle={
            color: "white",
            fontSize: "20px"
           }

        return(
            <div className="container">
                <div className="row">
                    <h1>{this.state.Category}</h1>
                </div>
                <div className="row">
                    {
                        this.Months.map((month,index) =>{
                            return (
                                <div className="col-3 col-xl-1" key={index}>
                                    <button value={month} onClick={this.OnClickMonth}  style={MonthBtn}> {month.slice(0,3)}</button>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="row mt-4 mb-4">
                    <div className="col" style={{display: "grid"}}>
                        <label style={LabelStyle}>SubTotal</label>
                        <input type="number" readOnly value={this.state.SubTotal}/>
                    </div>
                </div>
                <Link to="/GitTracker">
                    <button style={BtnBack}>
                        Back
                    </button>
                </Link>
            </div>
        );
    }
}

export default OneMonthTracker;