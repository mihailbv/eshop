import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, IndexRoute, Switch, Redirect } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import ProductsPage from '../components/containers/ProductsPage';
import Application from '../components/Application';

injectTapEventPlugin();

let browserHistory = Router.browserHistory;

class AppRouter extends Component {

	render() {
		return (
			<Router history={browserHistory}>
				<Application options="welcome home">
					<Switch>
						<Route exact path='/' render={() => (
						    <Redirect to="/kemerovo"/>
						)}/>
						<Route exact path='/:branch' component={ProductsPage} />
						<Route exact path='/:branch/:tag_id' component={ProductsPage} />
						<Route exact path='/:branch/:tag_id/:product_id' component={ProductsPage} />
					</Switch>
				</Application>
			</Router>
		);
	}
}

export default AppRouter;
