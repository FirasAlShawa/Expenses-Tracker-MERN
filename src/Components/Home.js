import React,{ Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";


 class Home extends Component {
  
  Months= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  date = new Date();

  constructor(props){
    super(props);
    
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeCategory =this.onChangeCategory.bind(this);
    
    this.state ={
      Year:this.date.getFullYear(),
        Month:this.Months[this.date.getMonth()],
        Category:"",
        Amount:0
    }

    console.log(this.state.Month);

  }

   getMonth = event => {
    // console.log(this.state);
    this.setState({ Month: event.target.value });
    // console.log(this.state);

   };

   onChangeAmount = event => {
     
    // console.log( this.state);
     this.setState({Amount:event.target.value});
    // console.log(this.state);

   };

   onChangeCategory = event => {
     this.setState({ Category: event.target.value });
     console.log(this.state.Month +  " || " +  this.state.Amount +  "||" +  event.target.value);
    //  console.log(this.state);
    if(this.state.Amount != 0 && this.state.Amount > 0){
    let Expense = {
      Year:this.state.Year,
      Month:this.state.Month,
      Category : event.target.value,
      Amount : this.state.Amount
    };

    axios.post("http://localhost:4000/Expenses/AddAndUpdate",Expense).then(res=>{
      console.log(res.data)
    });
  }
     this.resetExpense();

   };

   resetExpense = () => {
    // console.log(this.state);

     this.setState({
          Category:"",
          Amount:0
     });
   };

  //  setMonth = (event) =>{
  //     let date = new Date();
  //     event.target.value = this.state.Month[(date.getMonth()+1)];
  //  }

   render() {
     const Style = {
      "DisplayGrid":{
        display: "grid"
      }
      ,
      "MarginB":{
        marginBottom: "10px"
      }
      ,
      "MainColor":{
        backgroundColor: "#F2958D"
      }
      ,
      "LabelStyle":{
        color: "white",
        fontSize: "20px"
      }
      ,
      "BtnStyle":{
        backgroundColor: "#F7BA43",
        border: "#F7BA43 1px solid",
        borderRadius:"10px",
        fontSize: "20px",
        margin: "10px",
        padding: "5px"
      }
     }
    
     return (
       <div className="container" style={Style.MainColor}>
         <div className="row pt-2 pb-2">
           <div className="col" style={Style.MarginB}>

             <div style={Style.DisplayGrid }>
              <label style={Style.LabelStyle}> Date </label>
              <input type="text" readOnly  value = {this.state.Month}/>
             </div>
           </div>
           <div className="col" style={Style.MarginB}>
             <div style={Style.DisplayGrid}>
               <label style={Style.LabelStyle}> Amount </label>
               <input
                 type="number"
                 id="Amount"
                 name="Amount"
                 min="0"
                 value={this.state.Amount}
                 placeholder={this.state.Amount}
                 onChange={this.onChangeAmount}
               />
             </div>
           </div>
           <div className="col" style={Style.MarginB}>
             <div style={Style.DisplayGrid}>
               <label style={Style.LabelStyle}> Category </label>
               <select
                 id="Category"
                 name="Category"
                 value={this.state.Category}
                 onChange={this.onChangeCategory}
               >
                 <option value="selected" value="" />
                 <option value="Housing">Housing</option>
                 <option value="Enteratment">Enteratment</option>
                 <option value="Taxes">Taxes</option>
                 <option value="Repair and Maintenance">
                   Repair and Maintenance
                 </option>
                 <option value="Electricity and Water fees">
                   Electricity and Water fees
                 </option>
               </select>
             </div>
           </div>
         </div>
         <div className="row">
           <div className="col-12">
             <div>
               <Link to="/GitTracker"><button style={Style.BtnStyle}>Git Tracker</button></Link>
             </div>
           </div>
         </div>
       </div>
     );
   }
 }

export default Home;