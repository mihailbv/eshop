import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PromoSlider from './plugins/PromoSlider'
import Navbar from './partials/Navbar'
import Toolbar from './partials/Toolbar'
import Footer from './partials/Footer'
import CartWidget from './cart/CartWidget'
import AppAPI from '../utils/AppAPI'
import CartService from '../utils/CartService'
import ProductsPage from './containers/ProductsPage';
import l from '../utils/Localization'



class Application extends Component {

  constructor(props, context){
    super(props, context);
    l.setLanguage(props.locale ? props.locale : "ru");
  }

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
          <Navbar 
              collapsed={this.state.navbarCollapsed} 
              onToggleNavbar={this.handleToggleNavbar} 
              items={this.state.containerData.navbar} />
        }

        {this.props.children && 
            this.props.children
        }
        
        <CartWidget />
        <Toolbar onToggleNavbar={this.handleToggleNavbar} />
        <Footer />
      </div>
    )
  }
}

export default Application;
