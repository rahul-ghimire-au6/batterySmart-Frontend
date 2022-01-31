import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './login';
import Register from './register';
import Ventilation from './Ventilation';
import Cooling from './Cooling';
import HeatPumping from './HeatPump';
import OutOfHours from './OutOfHours';
import EvCharging from './EvCharging';
import LoadShifting from './LoadShifting';
import reportWebVitals from './reportWebVitals';
// import { Route, BrowserRouter as Router ,Routes , Navigate } from 'react-router-dom';
import { Route, BrowserRouter as Router ,Switch , Redirect } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/home/1/:value' component={App}/>
        <Route exact path='/home/2/:value' component={Ventilation}/>
        <Route exact path='/home/3/:value' component={Cooling}/>
        <Route exact path='/home/4/:value' component={HeatPumping}/>
        <Route exact path='/home/5/:value' component={OutOfHours}/>
        <Route exact path='/home/6/:value' component={EvCharging}/>
        <Route exact path='/home/7/:value' component={LoadShifting}/>
        <Redirect to='/login'/>
    </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
