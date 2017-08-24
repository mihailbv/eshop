import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
import AppAPI from '../../utils/AppAPI'
import CartService from '../../utils/CartService'
import l from '../../utils/Localization'

class CartWidget extends Component {

  DeliveryTypes = {
    DELIVERY:       "DELIVERY",
    PICKUP:         "PICKUP"
  }

  state = {
    flashed: false,
    cartDialog: false,
    cartData: false,
    deliveryType: "DELIVERY"
  }

  componentDidMount(){
    this.loadCart();
    CartService.registerCart(this);

    CartService.registerCallback(CartService.ToggleVisibility, (visible) => {
      this.toggleCartDialog(visible)
    });

    CartService.registerCallback(CartService.AddProduct, (item) => {
      this.addToCartEffect();
    });

  }

  loadCart = () => {
    AppAPI.query({
      url: AppAPI.urlAddProduct,
      onSuccess: (response) => {
        this.setState({
          cartData: response.data.cart,
        })
      }
    })
  }
  

  addToCartEffect = () => {
    let cartWidget = ReactDOM.findDOMNode(this.refs.cartWidget),
        cartWidgetContainer = this.refs.cartWidgetContainer;
    $(cartWidget).css({width: $(cartWidget).width(), height:$(cartWidget).height()});

    $(cartWidgetContainer).animate(
      {"margin-top": $(cartWidget).outerHeight()*-1 }, 200,
      () => {
        $(cartWidgetContainer).css({"margin-top": $(cartWidget).outerHeight()});
        $(cartWidgetContainer).animate(
          {"margin-top": 0}, 200,
          () => {
            $(cartWidget).css({width: "auto", height: "auto"});
            this.setState({
              flashed: false
            })
          }
        )
      });

    this.setState({
      flashed: true
    })
  }

  addProduct = (product_id, count) => {
    this.addToCartEffect();
  }

  toggleCartDialog = (visible) => {
    this.setState({
      cartDialog: visible
    });
    if (visible) {
      this.loadCart()
    }
  }

  toggleDeliveryType = (type) => {
    this.setState({
      deliveryType: type
    })
  }

  render() {
    return (
      <span>
        {this.state.cartData && this.state.cartData.count>0 &&
          <Link to="#" onClick={this.toggleCartDialog.bind(this, true)} className={`cart-widget hidden-xs` + (this.state.flashed ? " card-widget-falshed card-widget-bg-falshed" : "")} ref="cartWidget">
            <span className="cart-widget-container" ref="cartWidgetContainer">
              <i className="fa fa-shopping-basket" aria-hidden="true"></i>
            	<span className="cart-widget-title">{this.state.cartData.count} товара - {this.state.cartData.sum} р.</span>
              <span className="cart-widget-button"><span>{l.proceedOrder}</span></span>
            </span>
          </Link>
        }

        {this.state.cartDialog &&
          <Modal show className="modal-dialog-full cart-proceed-dialog">
            <Modal.Body>

              <div className="container-fluid">
                <div className="row">
                  


                  <div className="col-md-6 cart-dialog-column">

                    <h2 className="cart-you-order-title">{l.yourOrder}</h2>
                    <div className="cart-receipt">
                      {this.state.cartData.products && 
                        this.state.cartData.products.map((product)=>{
                          return(
                            <div key={product.id} className="cart-product">
                              <div className="cart-product-name">{product.name}</div>
                              <div className="cart-product-price"><b>{product.price.currentPrice / product.price.currency.unitSize}</b>р</div>
                              <div className="cart-product-count-control">
                                <Link to="#" onClick={this.addProduct.bind(this, product.id, -1)}>–</Link>
                                <span>{Math.round(Math.random()*100)+30}</span>
                                <Link to="#" onClick={this.addProduct.bind(this, product.id, +1)}>+</Link>
                              </div>
                            </div>
                          )
                        })
                      }
                      <div className="cart-receipt-footer">
                        Скидка
                        <div className="cart-receipt-total-value"><b>200</b>р</div>
                      </div>
                      <div className="cart-receipt-footer cart-receipt-total ">
                        Сумма
                        <div className="cart-receipt-total-value"><b>1 040</b>р</div>
                      </div>

                    </div>
                  </div>



                  <div className="col-md-6 cart-dialog-column">
                    
                    <div className="cr-dlvtype-container">
                      <Link to="#" className={this.state.deliveryType==this.DeliveryTypes.DELIVERY ? "cr-active" : ""} onClick={this.toggleDeliveryType.bind(this, this.DeliveryTypes.DELIVERY)}>Доставка</Link>
                      <Link to="#" className={this.state.deliveryType==this.DeliveryTypes.PICKUP ? "cr-active" : ""} onClick={this.toggleDeliveryType.bind(this, this.DeliveryTypes.PICKUP)}>Самовывоз</Link>
                    </div>

                    {this.state.deliveryType==this.DeliveryTypes.DELIVERY && 
                      <div className="cr-dlv-form-container">
                          <input type="hidden" name="delivery_type" title="Тип заказа" value="Доставка курьером" />
                          <div className="cr-block-title">Как с вами связаться</div>
                          <div className="row cf-form-line cr-two-field-line">
                            <div className="col-xs-6">
                              <span className="form-group has-float-label">
                                <input className="form-control" id="cart-name" placeholder=" " type="text" title="Имя" />
                                <label htmlFor="cart-name">Ваше имя</label>
                              </span>                        
                            </div>
                            <div className="col-xs-6">
                              <span className="form-group has-float-label">
                                <input className="form-control" id="cart-phone" placeholder="+7 (" type="text" title="Контактный телефон" required="Укажите ваш телефон" />
                                <label htmlFor="cart-phone">Телефон</label>
                              </span>                        
                            </div>
                          </div>

                          <br/>
                          <div className="cr-block-title">Адрес доставки</div>

                          <div className="cf-form-line">
                            <span className="form-group has-float-label">
                              <input className="form-control" id="cart-street" placeholder=" " type="text" title="Улица" required="Укажите улицу" />
                              <label htmlFor="cart-street">Улица*</label>
                            </span>
                          </div>
                          <div className="row cf-form-line cr-two-field-line">
                            <div className="col-xs-6">
                              <span className="form-group has-float-label">
                                <input className="form-control" id="cart-house" placeholder=" " type="text" title="Номер дома" required="Укажите номер дома" />
                                <label htmlFor="cart-house">Номер дома*</label>
                              </span>                        
                            </div>
                            <div className="col-xs-6">
                              <span className="form-group has-float-label">
                                <input className="form-control" id="cart-appartment" placeholder=" " type="text" title="Квартира/офис" required="Укажите квартиру/офис" />
                                <label htmlFor="cart-appartment">Квартира/офис*</label>
                              </span>                        
                            </div>
                          </div>
                          <div className="row cf-form-line cr-two-field-line">
                            <div className="col-xs-6">
                              <span className="form-group has-float-label">
                                <input className="form-control" id="cart-porch" placeholder=" " type="text" title="Подъезд" />
                                <label htmlFor="cart-porch">Подъезд</label>
                              </span>                        
                            </div>
                            <div className="col-xs-6">
                              <span className="form-group has-float-label">
                                <input className="form-control" id="cart-floor" placeholder=" " type="text" title="Этаж" />
                                <label htmlFor="cart-floor">Этаж</label>
                              </span>                        
                            </div>
                          </div>
                        
                          <br/>
                          <div className="cr-block-title">Дополнительно</div>
                          <div className="row cf-form-line cr-two-field-line">
                            <div className="col-xs-6 cr-gift-field">
                              <i className="glyphicon glyphicon-gift"></i>
                              <input type="text" className="form-control promo-manual" placeholder="Промокод" title="Промокод" name="promo" title="Промокод" />
                            </div>
                            <div className="col-xs-6">
                              <span className="form-group has-float-label">
                                <input className="form-control" id="cart-cutleries_count" placeholder=" " type="text" title="Кол-во приборов" />
                                <label htmlFor="cart-cutleries_count">Кол-во приборов</label>
                              </span>                        
                            </div>
                          </div>
                          <div className="cf-form-line">
                              <span className="form-group has-float-label">
                                <input className="form-control" id="cart-comment" placeholder=" " type="text" title="Комментарий курьеру" />
                                <label htmlFor="cart-comment">Комментарий курьеру</label>
                              </span>                        
                          </div>
                        
                      </div>
                    }

                    {this.state.deliveryType==this.DeliveryTypes.PICKUP && 
                      <div className="cr-dlv-form-container">
                          <input type="hidden" name="delivery_type" title="Тип заказа" value="Самовывоз" />
                          <input type="hidden" name="promo" value="914357" />
                          <div className="cr-block-title">Откуда будете забирать</div>
                          <div className="cf-form-line cf-radio-buttons">
                            <label className="cr-radio-container cr-radio-active"><input defaultChecked="checked" type="radio" name="pickup_address" title="Адрес самовывоза" value="ул. Гребенщикова, 2, ТЦ Атлас, г. Новосибирск, с 10:00 до 22:00" />ул. Гребенщикова, 2, ТЦ Атлас, г. Новосибирск, с 10:00 до 22:00</label>
                          </div>

                          <div className="cr-block-title">Как с вами связаться</div>
                        <div className="row cf-form-line cr-two-field-line">
                            <div className="col-xs-6">
                              <input type="text" className="form-control" name="name" placeholder="Имя" title="Имя" />
                            </div>
                            <div className="col-xs-6">
                              <input type="text" className="form-control" name="phone" placeholder="+7 (" title="Контактный телефон" required="Укажите ваш телефон" />
                            </div>
                          </div>
                          <div className="cf-form-line">
                            <textarea className="form-control" placeholder="Комментарий к заказу" rows="2" title="Комментарий к заказу"></textarea>
                          </div>
                      </div>
                    }
                    
                    <input type="button" value={l.createOrder} className="cart-dialog-create-order" />

                  </div>


                </div>
              </div>

              <Link to="#" onClick={this.toggleCartDialog.bind(this, false)} className="modal-dialog-close"></Link>
            </Modal.Body>
          </Modal>
        }
      </span>
    );
  }
}

export default CartWidget;
