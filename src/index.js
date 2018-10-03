import React ,{ Component }from 'react';
import ReactDOM from 'react-dom';

import { Router, Link, IndexRoute, hashHistory, browserHistory , BrowserRouter, Route } from 'react-router-dom'
import App from './Components/Base';
import Home from './Components/Home';
import PokeFacts from './Components/PokeFacts';

ReactDOM.render(
   
  (<BrowserRouter history={browserHistory} basename='/'>
    {/*  <Route component = {App}>
        <Route path='/' component={Home}></Route>
        <Route path='/pkmn/:pkmnId' component = {PokeFacts} />
    
      </Route>
    */}  
       
      <App/>

  </BrowserRouter>),
  document.getElementById('root')
);
