import React , {Component} from "react";
import {Link} from "react-router-dom";

class GitTracker extends Component{

  
  Months= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  date = new Date();s

  constructor(props){
    super(props)

    this.state={
      Month : this.Months[this.date.getMonth()],
      Categories : [
        "Housing",
        "Enteratment",
        "Taxes",
        "Repair and Maintenance",
        "Electricity and Water fees"
      ]
    }
  }

    render(){
        const BtnStyle={
            backgroundColor: "#F7BA43",
            border: "#F7BA43 1px solid",
            borderRadius:"10px",
            fontSize: "20px",
            margin: "10px",
            padding: "5px"
        }
        const BtnBack = {
            backgroundColor: "#F7BA43",
            border: "#F7BA43 1px solid",
            borderRadius:"10px",
            fontSize: "10px",
            margin: "5px",
        }
        return (
          <div className="container">

            {
              this.state.Categories.map((Category,index)=>{
                return (
                  <div className="row mt-2 mb-2 text-center" key={index}>
                  <div className="col-12">
                    <Link to={"/GitTracker/TrackType/"+Category}>
                        <button style={BtnStyle}>
                        {Category}
                        </button>
                    </Link>
                  </div>
                </div>
                );
              })
            }
          
            <Link to="/">
            <button style={BtnStyle}>
                Back
                </button>
            </Link>
          </div>
        );
    }
}

export default GitTracker; 