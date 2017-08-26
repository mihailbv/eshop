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
    tagsBarFixed: false,
    isStartingFromTagPage: this.props.match.params.tag_id ? true : false
  }

  componentDidMount(){
    if (this.props.match.params.tag_id) {
      this.loadData(AppAPI.urlTagContainer, {tag_id: this.props.match.params.tag_id})
    } else {
      this.loadData(AppAPI.urlIndexContainer)
    }
    this.holdTagsOnTop();
  }

  holdTagsOnTop = () => {
    $(window).scroll(()=>{
      this.observeTagsBegaviour()
    })
    $(window).resize(()=>{
      this.observeTagsBegaviour()
    })
  }

  observeTagsBegaviour = () => {
      let subNavbar = this.refs.tagsBarContainer,
          newTagsBarFixedState = this.state.tagsBarFixed;

      newTagsBarFixedState = $(subNavbar).position().top<$(window).scrollTop() ? true : false;
      if ($(window).width()<=768) {
        newTagsBarFixedState = false
      }
      if (this.state.tagsBarFixed != newTagsBarFixedState) {
        this.setState({
          tagsBarFixed: newTagsBarFixedState
        })        
      }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props.match)
    console.log(nextProps.match)
    if (this.state.isStartingFromTagPage && this.props.match.params.tag_id != nextProps.match.params.tag_id) {
      this.state.isStartingFromTagPage = false
      this.loadData(AppAPI.urlIndexContainer, {}, ()=>{
        $('html, body').animate({
          scrollTop: Math.random()*1000
        }, 500);
      })
    } else if (nextProps.match.params.tag_id!=this.props.match.params.tag_id) {
      $('html, body').animate({
        scrollTop: Math.random()*1000
      }, 500);      
    }
  }

  componentDidUpdate() {
      let subNavbar = this.refs.tagsBarContainer,
          tagsBarContent = this.refs.tagsBarContent;
      $(subNavbar).css({
        height: $(tagsBarContent).outerHeight()
      })
  }


  loadData = (url, params = {}, callback) => {
    AppAPI.query({
      url: url,
      data: params,
      onSuccess: (response) => {
        HeadUtil.setHead(response.data.head);
        this.setState({
          containerData: response.data
        })
        if (typeof(callback)!=="undefined") {
          callback();
        }
      }
    })
  }


  render() {
    console.log(this.props.match.params)
    return (
      <div>
        <PromoSlider />
        <div ref="tagsBarContainer" className={this.state.tagsBarFixed ? "sub-navbar-wrapper-fixed" : ""}>
          <div className="sub-navbar-wrapper-content" ref="tagsBarContent">
            <Subnavbar 
              items={this.state.containerData.tags} 
              url={`/${this.props.match.params.branch}`} 
              activeId={this.props.match.params.tag_id} ref="tagsBar" />
          </div>
        </div>
        <h2 className="product-list-tag-title">Суши</h2>
        <ProductList 
            products={this.state.containerData.products} 
            activeProductId={this.props.match.params.product_id}
            url={`/${this.props.match.params.branch}`}  />        
      </div>
    );
  }
}

export default ProductsPage;
