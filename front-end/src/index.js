import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
// import App from './component/App';
import {Provider} from 'react-redux';

import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import Navi from './component/Navi';
import Footer from './component/Footer';
import Home from './component/Home';
import Member from './component/member/Member';
import Partner from './component/partner/Partner';
import Resource from './component/resource/Resource';
import resourceForm from './component/resource/resourceForm';
import Project from './component/project/Project';
import ProjectForm from './component/project/ProjectForm';
import memberForm from './component/member/memberForm';
import partnerForm from './component/partner/partnerForm';

import './index.css';

const store = createStore (
  rootReducer,
  composeWithDevTools(
    applyMiddleware(logger,thunk)
  )
  );

ReactDOM.render(
  <Provider store = { store } >
    <Router>
      <Navi />
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/member" component= {Member} />
          <Route exact path="/member/:id" component= {memberForm} />
          <Route path="/member/:id/edit" component= {memberForm} />
          <Route path="/NewMember" component= {memberForm}/>

          <Route exact path="/Partner" component = {Partner} />
          <Route exact path="/partner/:id" component= {partnerForm} />
          <Route path="/partner/:id/edit" component= {partnerForm} />
          <Route path="/NewPartner" component= {partnerForm}/>

          <Route exact path="/resource" component = {Resource} />
          <Route exact path="/resource/:id" component= {resourceForm} />
          <Route path="/resource/:id/edit" component= {resourceForm} />
          <Route path="/NewResource" component= {resourceForm}/>

          <Route exact path="/Project" component= {Project} />
          <Route exact path="/Project/:id" component= {ProjectForm} />
          <Route path="/Project/:id/edit" component= {ProjectForm} />
          <Route path="/NewProject" component= {ProjectForm}/>
        </Switch>
        <Footer />
    </Router>
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();
