import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PromoSlider from './plugins/PromoSlider'
import Navbar from './partials/Navbar'
import Toolbar from './partials/Toolbar'
import Footer from './partials/Footer'
import CartWidget from './cart/CartWidget'
import ProductsPage from './containers/ProductsPage';
import AppAPI from '../utils/AppAPI'
import l from '../utils/Localization'



class Application extends Component {

  constructor(props, context){
    super(props, context);
    l.setLanguage(props.locale ? props.locale : "ru");
  }

  state = {
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

  render() {

    return (
        <div>
        {this.state.containerData.navbar &&
          <Navbar 
              collapsed={this.state.navbarCollapsed} 
              items={this.state.containerData.navbar} />
        }

        {this.props.children && 
            this.props.children
        }
        
        <CartWidget />
        <Toolbar />
        <Footer />
      </div>
    )
  }
}

export default Application;
