import React, { Component, PropTypes } from 'react';
import { Link, Redirect } from 'react-router-dom'
import ProductCart from './ProductCart'
import { Modal, Button } from 'react-bootstrap'
import { browserHistory } from 'react-router';
import AppAPI from '../../utils/AppAPI'
import l from '../../utils/Localization'
import CartService from '../../utils/CartService'


class ProductList extends Component {

  state = {
  }

  addProduct = (item) => {
    CartService.call(CartService.AddProduct, item)
  }

  render() {
    return (
      <div>
        <div className="product-list">
          {this.props.products &&
            this.props.products.map((product) => {
              return (
                  <ProductCart 
                    key={product.id} 
                    url={`/${this.props.tag_id}`} 
                    product={product} 
                    onProductBuyDialog={this.handleOpenProductBuyDialog} />
                )
            })
          }
        </div>

        {this.props.product &&
          <Modal show className="modal-dialog-full modal-max-width-1200">
            <Modal.Body>
              <Link to={`/${this.props.product.tag_id}`} className="modal-dialog-close"></Link>
              <div className="container-fluid product-full-cart">
                <div className="row">
                  <div className="col-md-6">
                    <img src={`${this.props.product.imageServer}/${this.props.product.imageName}`} style={{height: "200px"}}/>
                  </div>
                  <div className="col-md-6">
                    <h1 className="product-full-cart-name">{this.props.product.name}</h1>
                    <div className="product-full-cart-description">Пицца со вкусом домашней щедрости и уюта. Фирменный соус, сыр, ветчина, салями, колбаса п/к, помидоры, перец болгарский, маринованные огурчики, базилик, зелень. В мелкую нарезку.</div>
                    

                    <br/>
                    <Link to="#" onClick={this.addProduct.bind(this, this.props.product)} className="button-solid">{l.putToBasket}</Link>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        }

      </div>
    );
  }
}

export default ProductList;
