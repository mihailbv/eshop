import React, { Component, PropTypes } from 'react';
import { Link, Redirect } from 'react-router-dom'
import ProductCart from './ProductCart'
import { Modal, Button } from 'react-bootstrap'
import { browserHistory } from 'react-router';
import AppAPI from '../../utils/AppAPI'
import l from '../../utils/Localization'
import AppEvents from '../../utils/AppEvents'
import AppDispatcher from '../../utils/AppDispatcher'

class ProductList extends Component {

  state = {
    activeProduct: false
  }

  componentDidMount = () => {
    $(window).on("scroll", this.lazyLoadProductsImage);
  }

  componentWillUnmount() {
    $(window).off("scroll", this.lazyLoadProductsImage);
  }

  componentDidUpdate = () => {
    this.lazyLoadProductsImage();
  }

  lazyLoadProductsImage = () => {
    let list = $(this.refs.productList);
    let needDounload = list.find(".product-cart .product-cart-image[data-image]");
    $.each(needDounload, function(index, el) {
      let item = $(el).parents(".product-cart")

      if ($(item).position().top<$(window).scrollTop()+$(window).height()) {
        let image_url = $(el).attr("data-image");

        $(el).css({"background-image": `url(${image_url})`, "background-size": "cover"});
        $(el).removeAttr('data-image');
      }
    });
  }

  addProduct = (item) => {
    AppDispatcher.fire(AppEvents.AddProduct, item, 1)
  }

  render() {
    this.state.activeProduct = false;
    return (
      <div>
        <div className="product-list" ref="productList">
          {this.props.products &&
            this.props.products.map((product) => {
              if (this.props.activeProductId && this.props.activeProductId==product.id) {
                this.state.activeProduct = product;
              }
              return (
                  <ProductCart 
                    key={product.id} 
                    url={`${this.props.url}/current_tag_id`}
                    product={product}
                    isActive={product.id == this.props.activeProductId} />
                )
            })
          }
        </div>

        {this.state.activeProduct &&
          <Modal show className="modal-dialog-full modal-max-width-1200">
            <Modal.Body>
              <Link to={`${this.props.url}/current_tag_id`} className="modal-dialog-close"></Link>
              <div className="container-fluid product-full-cart">
                <div className="row">
                  <div className="col-md-6">
                    <div className="product-full-cart-image" style={{backgroundImage: `url(${this.state.activeProduct.imageServer}/${this.state.activeProduct.imageName})`}} />
                  </div>
                  <div className="col-md-6">
                    <h1 className="product-full-cart-name">{this.state.activeProduct.name}</h1>
                    <div className="product-full-cart-description">Пицца со вкусом домашней щедрости и уюта. Фирменный соус, сыр, ветчина, салями, колбаса п/к, помидоры, перец болгарский, маринованные огурчики, базилик, зелень. В мелкую нарезку.</div>

                    <div className="product-full-cart-properties">
                      <div className="">Количество:</div><div className="">10 шт.</div>
                      <div className="">Вес:</div><div className="">180 г.</div>
                      <div className="">Имя угря:</div><div className="">Василий Генадьевич</div>
                    </div>

                    
                    <div className="product-full-variations">
                      <div className="product-full-variation-group">
                        <div className="product-full-variation-group-name">Количество роллов</div>
                        <Link to="#" className="button-empty button-small">4 шт</Link>
                        <Link to="#" className="button-empty button-small product-variant-active">8 шт</Link>
                        <Link to="#" className="button-empty button-small">16 шт</Link>
                      </div>

                      <div className="product-full-variation-group">
                        <div className="product-full-variation-group-name">Размер</div>
                        <Link to="#" className="button-empty button-small">Малипуськи</Link>
                        <Link to="#" className="button-empty button-small product-variant-active">Середничок</Link>
                        <Link to="#" className="button-empty button-small">Порви-рот</Link>
                      </div>

                    </div>

                    <div className="product-full-cart-buy-container">
                      <Link to="#" onClick={this.addProduct.bind(this, this.state.activeProduct)} className="button-solid button-large">{l.putToBasket}</Link>
                      <div className="product-full-cart-buy-price">440 р.</div>
                    </div>
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
