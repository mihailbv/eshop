import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'
import AppEvents from '../../utils/AppEvents'
import AppDispatcher from '../../utils/AppDispatcher'
import l from '../../utils/Localization'

class Toolbar extends Component {

	state = {
		cartTotal: 0
	}

	componentDidMount() {
		AppDispatcher.on(AppEvents.UpdateCart, (cart)=>{
			this.setState({
				cartTotal: cart.sum
			})			
		})
	}

	toggleNavbar = () => {
		AppDispatcher.fire(AppEvents.ToggleNavbar)
	}

	openCart = () => {
		AppDispatcher.fire(AppEvents.ToggleBasket, true)
	}

	render() {
		return (
			<div className="bottom-navbar hidden-sm hidden-md hidden-lg">
				<div className="container">
					<div className="row">
						<div className="col-xs-3">
							<Link to="#" className="bottom-navbar-button toggle-sidebar-button" onClick={this.toggleNavbar}>
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
								<i className="fa fa-shopping-basket" aria-hidden="true">
									{this.state.cartTotal && this.state.cartTotal>0 &&
										<span className="badge">{this.state.cartTotal}</span>
									}
								</i>
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
