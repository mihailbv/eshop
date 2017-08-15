import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'

class Subnavbar extends Component {

	state = {
		toggleButtonVisible: true,
		opened: false
	}

	windowResizer = () => {
		this.checkNavbarToggleButton();
	}

	handleToggleNavbar = (event) => {
		this.setState({
			opened: !this.state.opened
		})
	}

	componentDidMount = () => {
		$(window).resize(this.windowResizer)
		this.checkNavbarToggleButton();
	}

	componentDidUpdate = () => {
		this.checkNavbarToggleButton();
	}

	checkNavbarToggleButton = () => {
		let newButtonState = $(this.refs.subNavbarContainer).outerHeight() > $(this.refs.subNavbar).outerHeight()
		if (this.state.toggleButtonVisible != newButtonState) {
			this.setState({
				toggleButtonVisible: newButtonState
			})
		}
	}

	componentWillUnmount() {
		$(window).off("resize", this.windowResizer);
	}

	render() {
		return (
			<div className={"sub-navbar" + (this.state.opened ? " sub-navbar-opened" : "")} ref="subNavbar">
				{(this.state.toggleButtonVisible || this.state.opened) &&
					<Link to="#" className="sub-navbar-toggle" onClick={this.handleToggleNavbar}>
						{this.state.opened ?
							<span>Свернуть<i className="fa fa-caret-up" aria-hidden="true"></i></span>
							:
							<span>Еще..<i className="fa fa-caret-down" aria-hidden="true"></i></span>
						}
					</Link>
				}
				<div className="sub-navbar-container" ref="subNavbarContainer">
					{this.props.items &&
						this.props.items.map(function(item){
						return (
								<Link className={item.id==7 ? "active" : ""} to="#" key={item.id}>
									<span className='sub-navbar-item-image' style={{backgroundImage: "url("+item.image+")"}}></span>
									<span className='sub-navbar-item-title'>{item.title}</span>
								</Link>
							)
					})}
				</div>
			</div>
		);
	}
}

export default Subnavbar;

