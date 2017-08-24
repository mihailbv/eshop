import React, { Component, PropTypes } from 'react';
import ProductCart from '../products/ProductCart'
import Slider from 'react-slick'

class ProductsSlider extends Component {

	componentUpdated = () => {
		let sl = $("#products-slider")
		sl.smoothTouchScroll({ 
			continuousScrolling: true
		});
		// console.log($.smoothTouchScroll)
	}

	render() {
	    var settings = {
	      className: 'center',
	      infinite: true,
	      centerPadding: '60px',
	      slidesToShow: 5,
	      swipeToSlide: true,
	      afterChange: function (index) {
	        console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
	      }
	    };
		return (
		  <div className="products-slider" ref="productsSlider">
		  	{this.props.products &&
			  	<Slider>
			        {this.props.products.map((product) => {
			          return (
			          		<div>
			          			<Link to="http://yandex.ru/" style={{padding: "50px", display:block}}>
			          				{product.name}
			          			</Link>
			          		</div>
			            )
			        })}
			    </Slider>
			}
		  </div>
		);
	}
}

export default ProductsSlider;
