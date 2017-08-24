import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'
import l from '../../utils/Localization'

class Subnavbar extends Component {

	state = {
		toggleButtonVisible: false,
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

	handleCollapseNavbar = (event) => {
		this.setState({
			opened: false
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
		// TOOD: Calculate right padding by toggle button length
		// let subNavbarToggle = $(this.refs.subNavbar).find(".sub-navbar-toggle")
		// let subNavbarToggleLength = subNavbarToggle[0] ? subNavbarToggle.outerWidth() : 0

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
					<Link to="#" className="sub-navbar-toggle" onClick={this.handleToggleNavbar} ref="subNavbarToggle">
						{this.state.opened ?
							<span>{l.collapse}<i className="fa fa-caret-up" aria-hidden="true"></i></span>
							:
							<span>{l.more}..<i className="fa fa-caret-down" aria-hidden="true"></i></span>
						}
					</Link>
				}
				<div className="sub-navbar-container" ref="subNavbarContainer">
					{this.props.items &&
						this.props.items.map((item) => {
						return (
								<Link to={this.props.url + item.id} onClick={this.handleCollapseNavbar} className={parseInt(item.id)==parseInt(this.props.activeId) ? "active" : ""} key={item.id}>
									{item.image ?
										<span className='sub-navbar-item-image' style={{backgroundImage: "url("+item.image+")"}}></span>
										:
										<span className='sub-navbar-item-image sub-navbar-item-no-image'></span>
									}
									<span className='sub-navbar-item-title'>{item.name}</span>
								</Link>
							)
					})}
				</div>
			</div>
		);
	}
}

export default Subnavbar;

