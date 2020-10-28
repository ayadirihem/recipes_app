import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Recipes from './Components/Recipes'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import AddRecipe from './Components/pages/AddRecipe';
import  './css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Detail from './Components/pages/detail';
import * as Firebase from "./Firebase";
class App extends Component {
  
  render(){
    console.log(Firebase)
    return (
      <Router>
        <Route 
           path="/recipe/detail/:Title"
           render={props =>(
             <Detail {...props} />
           )}
        />
        <Route 
           path="/recipe/add"
           
           component={AddRecipe}
           render ={props =>(
            <AddRecipe />
          )} />
        <Route path="/"
        exact={true}
        render={props =>{
          return(
            <Recipes />
          )
        }}
        />
        
      </Router>
    );}
}

export default App;
