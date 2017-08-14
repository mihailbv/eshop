import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'

class ProductCart extends Component {

  render() {

    return (
      <span className="product-cart">
        <span>{this.props.product.name}</span> 
      </span>
    );
  }
}

export default ProductCart;
