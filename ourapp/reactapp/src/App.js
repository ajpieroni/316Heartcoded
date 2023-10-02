import logo from './logo.svg';
import './App.css';
import Content from './content';
import Footer from './footer';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
   return (

    <>

    {/* <Router> */}
{/*       
      <Switch>
        <Route exact path ="/" component = {HomePage} />
        <Route path ="/FAQ" component = {FAQ} />
        <Route path ="/About Us" component = {AboutUs} />
      </Switch> */}

    <div className = "App">
      <Header />
    </div>
    <Content />
    <Footer />
    {/* </Router> */}
    </>
  

  );
}

export default App;