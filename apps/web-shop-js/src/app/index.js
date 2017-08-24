import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, IndexRoute, Switch } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Application from './components/Application';
import { AppContainer }     from 'react-hot-loader';
import Home from './components/Home';
import ProductsPage from './components/containers/ProductsPage';

import 'jquery';
import 'babel-polyfill';
import 'animate.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../style/index.scss';
import '../style/products.scss';
import '../style/cart.scss';
import '../style/bootstrap-float-label.min.css';
import '../style/dialog.scss';
import '../style/product-dialog.scss';





injectTapEventPlugin();

let browserHistory = Router.browserHistory;

render((
	<Router history={browserHistory}>
		<Application>
			<Switch>
				<Route exact path='/' component={ProductsPage}/>
				<Route exact path='/:tag_id' render={(props) => (<ProductsPage {...props} />)}/>
				<Route exact path='/:tag_id/:product_id' component={ProductsPage}/>
			</Switch>
		</Application>
	</Router>
), document.getElementById('root'));
