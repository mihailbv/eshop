import React, { Component, PropTypes } from 'react';
import {Carousel} from 'react-bootstrap'

class PromoSlider extends Component {

  render() {

    return (
	  <Carousel>
	    <Carousel.Item>
	      <div className="promo-slider" style={{background: "url(http://localhost/eshop/h-banner.jpg) center center no-repeat", backgroundSize: "cover"}} />
	    </Carousel.Item>
	    <Carousel.Item>
	      <div className="promo-slider" style={{background: "url(http://localhost/eshop/h-banner.jpg) center center no-repeat", backgroundSize: "cover"}} />
	    </Carousel.Item>
	    <Carousel.Item>
	      <div className="promo-slider" style={{background: "url(http://localhost/eshop/h-banner.jpg) center center no-repeat", backgroundSize: "cover"}} />
	    </Carousel.Item>
	  </Carousel>
    );
  }
}

export default PromoSlider;
