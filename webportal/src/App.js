import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Menu from './component/menu';
import Footer from './component/footer';
import ScrollToTop from './component/scrollToTop'

import Main from './page/main'
import Project from './page/project'
import Member from  './page/member'
import Resource from './page/resource' 
import Partner from './page/partner'
import ProjectDetail from './page/projectDetail';
import ResourceDetail from './page/resourceDetail'


function App() {
  return (
          <Router basename="/" >
            <Menu />
              <ScrollToTop>
                <Switch>
                <Route exact path="/" component= {Main} />
                <Route exact path="/Project" component= {Project} />
                <Route path="/Project/:id" component= {ProjectDetail} />
                <Route exact path="/member" component= {Member} />
                <Route exact path="/resource" component = {Resource} />
                <Route exact path="/resource/:id" component = {ResourceDetail} />
                <Route exact path="/Partner" component = {Partner} />
                </Switch>
              </ScrollToTop>
            <Footer />
          </Router>
  );
}
export default App;
