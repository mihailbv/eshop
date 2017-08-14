import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Application from './components/Application';
import ProductsPage from './components/containers/ProductsPage';
import { AppContainer }     from 'react-hot-loader';
import Home from './components/Home';

import 'babel-polyfill';
import 'animate.css';
import 'jquery';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../style/index.scss';

injectTapEventPlugin();


render((
    <AppContainer>
      <Router>
          <Application>
              <Route exact={true} path="/" component={Home} />
              <Route path="/products" component={ProductsPage} />
          </Application>
      </Router>
    </AppContainer>

), document.getElementById('root'));
