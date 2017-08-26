import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'
import AppEvents from '../../utils/AppEvents'
import AppDispatcher from '../../utils/AppDispatcher'


class Navbar extends Component {

	state = {
		opened: false
	}

	toggleNavbar = (opened = !this.state.opened) => {
		this.setState({
			opened: opened
		})
	}

	componentDidMount = () => {
		AppDispatcher.on(AppEvents.ToggleNavbar, (opened) => {
			this.toggleNavbar(opened)
		})
	}

	render() {
		return (
			<div className={"top-navbar" + (this.state.opened ? "" : " side-position-closed")}>
				<div className="container">
					{this.props.items.map(function(item){
						return (
							<Link to={item.link}  className={item.className ? item.className : "top-navbar-button"} key={item.title}>
								{item.glyphClassName &&
									<i className={item.glyphClassName}></i>
								}	
								{item.title}
							</Link>
						)
					})}
				</div>
				<div className="sidebar-screen-overlay" onClick={this.toggleNavbar.bind(this, false)}></div>
			</div>
		);
	}
}

export default Navbar;
