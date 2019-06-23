import React,{ Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home";
import GitTracker from "./Components/GitTracker";
import oneMonth from "./Components/OneMonthTrack";
import {BrowserRouter as Rounter , Route , Link} from "react-router-dom";


function App() {
  const MainColor ={
    backgroundColor : "#F2958D"
  };
  return (
    <Rounter>
        <div className="container" style={MainColor} >

          <Route path="/" exact strcict component={Home} />
          <Route path="/GitTracker" exact strcict component={GitTracker}/>
          <Route path="/GitTracker/TrackType/:Category/" exact strcict component={oneMonth}/>
          
          </div>
        
      </Rounter>
    );
}

export default App;
