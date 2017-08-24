import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'
import CartService from '../../utils/CartService'
import l from '../../utils/Localization'

class Toolbar extends Component {

	handleToggleNavbar = (event) => {
		this.props.onToggleNavbar(event)
	}

	openCart = () => {
		CartService.call(CartService.ToggleVisibility, true)
	}

	render() {
		return (
			<div className="bottom-navbar hidden-sm hidden-md hidden-lg">
				<div className="container">
					<div className="row">
						<div className="col-xs-3">
							<Link to="#" className="bottom-navbar-button toggle-sidebar-button" onClick={this.handleToggleNavbar}>
								<i className="fa fa-bars" aria-hidden="true"></i>
								Меню
							</Link>
						</div>

						<div className="col-xs-3">
							<a className="bottom-navbar-button">
								<i className="fa fa-percent" aria-hidden="true"></i>
								Акции
							</a>
						</div>

						<div className="col-xs-3">
							<a className="bottom-navbar-button">
								<i className="fa fa-comments-o" aria-hidden="true"><span className="badge badge-green">14</span></i>					
								Отзывы
							</a>
						</div>

						<div className="col-xs-3">
							<Link to="#" onClick={this.openCart} className="bottom-navbar-button">
								<i className="fa fa-shopping-basket" aria-hidden="true"><span className="badge">10$</span></i>
								{l.basket}
							</Link>
						</div>

					</div>
				</div>
			</div>

		);
	}
}

export default Toolbar;
