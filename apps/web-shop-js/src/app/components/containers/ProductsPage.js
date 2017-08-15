import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'
import HeadUtil from '../../utils/HeadUtil'
import AppAPI from '../../utils/AppAPI'
import ProductCart from '../products/ProductCart'
import Subnavbar from '../partials/Subnavbar'


class ProductsPage extends Component {

  state = {
    containerData: {}
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
  }

  render() {

    if (this.state.containerData.head) {
      HeadUtil.setHead(this.state.containerData.head);
    }

    return (
      <div>
        <Subnavbar items={this.state.containerData.tags} />
        <br/>
        {this.state.containerData.products &&
          this.state.containerData.products.map(function(product){
            return (
                <ProductCart key={product.id} product={product} />
              )
          })
        }
      </div>
    );
  }
}

export default ProductsPage;
