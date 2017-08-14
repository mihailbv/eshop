import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'

class Toolbar extends Component {

	handleToggleNavbar = (event) => {
		this.props.onToggleNavbar(event)
	}

	render() {
		return (
			<div className="bottom-navbar hidden-sm hidden-md hidden-lg">
				<div className="container">
					<div className="row">
						<div className="col-xs-3">
							<a href="#" className="bottom-navbar-button toggle-sidebar-button" onClick={this.handleToggleNavbar}>
								<i className="fa fa-bars" aria-hidden="true"></i>
								Menu
							</a>
						</div>

						<div className="col-xs-3">
							<a className="bottom-navbar-button">
								<i className="fa fa-percent" aria-hidden="true"></i>
								News
							</a>
						</div>

						<div className="col-xs-3">
							<a className="bottom-navbar-button">
								<i className="fa fa-comments-o" aria-hidden="true"><span className="badge badge-green">14</span></i>					
								Responses
							</a>
						</div>

						<div className="col-xs-3">
							<a className="bottom-navbar-button">
								<i className="fa fa-shopping-basket" aria-hidden="true"><span className="badge">10$</span></i>
								Cart
							</a>
						</div>

					</div>
				</div>
			</div>

		);
	}
}

export default Toolbar;
