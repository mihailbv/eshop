import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'

class Navbar extends Component {

	state = {
		collapsed: this.props.collapsed
	}

	handleToggleNavbar = (event) => {
		this.props.onToggleNavbar(event)
	}

	render() {
		return (
			<div className={"top-navbar" + (this.props.collapsed ? " side-position-closed" : "")}>
				<div className="container">
					{this.props.items.map(function(item){
						return (
							<Link to={item.link} className={item.className ? item.className : "top-navbar-button"} key={item.title}>
								{item.glyphClassName &&
									<i className={item.glyphClassName}></i>
								}	
								{item.title}
							</Link>
						)
					})}
				</div>
				<div className="sidebar-screen-overlay" onClick={this.handleToggleNavbar}></div>
			</div>
		);
	}
}

export default Navbar;
