import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'
import PromoSlider from './plugins/PromoSlider'
import Navbar from './partials/Navbar'
import Toolbar from './partials/Toolbar'
import Footer from './partials/Footer'
import AppAPI from '../utils/AppAPI'

class Application extends Component {

  state = {
    navbarCollapsed: true,
    containerData: {}
  }

  componentDidMount(){
    AppAPI.query({
      url: AppAPI.urlSiteLayout,
      onSuccess: (response) => {
        this.setState({
          containerData: response.data
        })
      }
    })
  }

  handleToggleNavbar = () => {
    this.setState({
      navbarCollapsed: !this.state.navbarCollapsed
    })
  }

  render() {
    return (
      <div>
        {this.state.containerData.navbar &&
          <Navbar collapsed={this.state.navbarCollapsed} onToggleNavbar={this.handleToggleNavbar} items={this.state.containerData.navbar} />
        }

        <PromoSlider />
        
        {this.props.children &&
          this.props.children
        }
        
        <Toolbar onToggleNavbar={this.handleToggleNavbar} />
        <Footer />
      </div>
    );
  }
}

export default Application;
