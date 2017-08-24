import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import HeadUtil from '../../utils/HeadUtil'
import AppAPI from '../../utils/AppAPI'
import ProductList from '../products/ProductList'
import Subnavbar from '../partials/Subnavbar'
import PromoSlider from '../plugins/PromoSlider'
import l from '../../utils/Localization'
import CartWidget from '../cart/CartWidget'


class ProductsPage extends Component {
  state = {
    containerData: {},
    tagsBarFixed: false
  }

  handleRedirect = (url) => {
    this.props.history.push(url)
  }

  componentDidMount(){
    AppAPI.query({
      url: AppAPI.urlIndexContainer,
      onSuccess: (response) => {
        this.setState({
          containerData: response.data
        })
      }
    })
    this.holdTagsOnTop();
  }

  holdTagsOnTop = () => {
    $(window).scroll(()=>{
      let subNavbar = this.refs.tagsBarContainer,
          newTagsBarFixedState = this.state.tagsBarFixed;

      newTagsBarFixedState = $(subNavbar).position().top<$(window).scrollTop() ? true : false;
      if (this.state.tagsBarFixed != newTagsBarFixedState) {
        this.setState({
          tagsBarFixed: newTagsBarFixedState
        })        
      }
    })
  }

  componentDidUpdate() {
      let subNavbar = this.refs.tagsBarContainer,
          tagsBarContent = this.refs.tagsBarContent;
      $(subNavbar).css({
        height: $(tagsBarContent).outerHeight()
      })
  }

  currentProduct = () => {
    return this.state.containerData.products && this.props.match.params.product_id ? this.state.containerData.products[0] : null
  }

  propTypes: {
      appName: React.PropTypes.string.isRequired
  }


  render() {
    if (this.state.containerData.head) {
      HeadUtil.setHead(this.state.containerData.head);
    }
    return (
      <div>
        <PromoSlider />
        <div ref="tagsBarContainer" className={this.state.tagsBarFixed ? "sub-navbar-wrapper-fixed" : ""}>
          <div className="sub-navbar-wrapper-content" ref="tagsBarContent">
            <Subnavbar items={this.state.containerData.tags} url="/" activeId={this.props.match.params.tag_id} ref="tagsBar" />
          </div>
        </div>
        <h2 className="product-list-tag-title">Суши</h2>
        <ProductList 
            products={this.state.containerData.products} 
            tag_id={this.props.match.params.tag_id} 
            product={this.currentProduct()} />        
      </div>
    );
  }
}

export default ProductsPage;
