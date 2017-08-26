import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'
import l from '../../utils/Localization'

class ProductCart extends Component {

  render() {
    return (
		<Link to={`${this.props.url}/${this.props.product.id}`} className="product-cart">
	      	<span className="product-cart-content">
		      	<span className="product-cart-image" data-image={`${this.props.product.imageServer}/${this.props.product.imageName}`} />
		      	<span className="product-cart-title">
			        <span className="product-cart-name">{this.props.product.name}</span>
			        <span className="product-cart-comment">Рис, нори, мягкий сыр, икра лососевая, соус унаги, огурец, семга, салат, кунжут.</span>
			    </span>
			    <span className="product-cart-buy-container">
			    	<span className="product-cart-price">{this.props.product.price.currentPrice/100} {this.props.product.price.currency.postfix}</span>
			    	<span className="product-cart-buy-button button-empty">{l.buy}</span>
			    </span>
			    {this.props.product.label &&
			    	<span className="product-cart-label">{this.props.product.label}</span>
			    }
		    </span>
	    </Link>
    );
  }
}

export default ProductCart;
