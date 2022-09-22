import React from "react";
import { connect } from "react-redux";
import {
  renderPreferedPriceCurrency,
  showSize,
  pluralize,
  incrementQuantity,
  decrementQuantity,
  getTotal,
} from "../../Utils/utilities";
import { xAxis, yAxis } from "../../assets/axes";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart, unfreezeContent } from "../../redux/index";

class CartOverlay extends React.Component {
  render() {
    return (
      <>
        <div className="cartOverlay-heading">
          <span className="my-bag">My Bag,</span>{" "}
          <span className="q-count">
            {getTotal(this.props.cartData.cart, this.props.selectedCurrency)[1]}{" "}
            {pluralize(getTotal(this.props.cartData.cart, this.props.selectedCurrency)[1])}
          </span>
        </div>
        <div className="items-wrapper">
          {this.props.cartData.cart && this.props.cartData.cart.length > 0 ? (
            [...this.props.cartData.cart].map((prodObj, idx) => (
              <div key={`product-${idx}`} className="cartItem">
                <div className="left-side">
                  <div className="cartItem-heading">
                    <p>{prodObj.product.brand}</p>
                    <p>{prodObj.product.name}</p>
                  </div>
                  <div className="cartItem-price">
                    <span>
                      {
                        renderPreferedPriceCurrency(
                          prodObj.product,
                          this.props.selectedCurrency
                        )?.currency.symbol
                      }
                    </span>
                    <span>
                      {
                        renderPreferedPriceCurrency(
                          prodObj.product,
                          this.props.selectedCurrency
                        )?.amount.toFixed(2)
                      }
                    </span>
                  </div>
                  <div className="cartItem-attributes">
                    {prodObj.product.attributes &&
                    prodObj.product.attributes.length > 0
                      ? prodObj.product.attributes.map((object) => {
                          if (object.type === "text") {
                            return (
                              <div key={object.id} className="type-text">
                                <p className="attributes-size">
                                  {object.name}:
                                </p>
                                <div className="attributes-size-div">
                                  {object.items && object.items.length > 0
                                    ? object.items.map((item) => (
                                        <div
                                          key={item.id}
                                          className={
                                            item.value ===
                                              prodObj.attrOptions[
                                                object.name
                                              ] && object.name === "Size"
                                              ? "choice"
                                              : item.value ===
                                                  prodObj.attrOptions[
                                                    object.name
                                                  ] && object.name !== "Size"
                                              ? "choice-reserviced"
                                              : item.value !==
                                                  prodObj.attrOptions[
                                                    object.name
                                                  ] && object.name === "Size"
                                              ? "size-box"
                                              : item.value !==
                                                  prodObj.attrOptions[
                                                    object.name
                                                  ] && object.name !== "Size"
                                              ? "size-box-reserviced"
                                              : null
                                          }
                                        >
                                          <div>
                                            {showSize(
                                              item.value,
                                              item.displayValue
                                            )}
                                          </div>
                                        </div>
                                      ))
                                    : null}
                                </div>
                              </div>
                            );
                          }
                          if (object.type === "swatch") {
                            return (
                              <div key={object.id} className="type-swatch">
                                <p className="attributes-color">
                                  {object.name}:
                                </p>
                                <div className="attributes-color-div">
                                  {object.items && object.items.length > 0
                                    ? object.items.map((item) => (
                                        <div
                                          key={item.id}
                                          className="parent-box"
                                          style={
                                            item.value ===
                                            prodObj.attrOptions[object.name]
                                              ? { border: "1px solid #5ECE7B" }
                                              : null
                                          }
                                        >
                                          <div
                                            className="swatch-box"
                                            style={{
                                              backgroundColor: item.value,
                                            }}
                                          ></div>
                                        </div>
                                      ))
                                    : null}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })
                      : null}
                  </div>
                </div>
                <div className="mid">
                  <div
                    className="increment"
                    onClick={() =>
                      incrementQuantity(prodObj, this.props.dispatch, addToCart)
                    }
                  >
                    <span className="x">{xAxis}</span>
                    <span className="y">{yAxis}</span>
                  </div>
                  <div className="count">
                    <span>{prodObj.quantity}</span>
                  </div>
                  <div
                    className="decrement"
                    onClick={() =>
                      decrementQuantity(
                        prodObj,
                        this.props.dispatch,
                        removeFromCart
                      )
                    }
                  >
                    <span>{xAxis}</span>
                  </div>
                </div>
                <div className="right-side">
                  <img src={prodObj.product.gallery[0]} alt="first of them" />
                </div>
              </div>
            ))
          ) : (
            <div style={{ marginBlock: "20px" }}>
              There's no product in your cart
            </div>
          )}
        </div>
        <div>
          <div className="total">
            <p>Total</p>
            <div>
              <span>{this.props.selectedCurrency.symbol}</span>
              <span>
                {
                  getTotal(
                    this.props.cartData.cart,
                    this.props.selectedCurrency
                  )[0]
                }
              </span>
            </div>
          </div>
          <div className="cart-buttons">
            <Link
              className="view-bag"
              to="/CartPage"
              style={{ textDecoration: "none", width: "140px" }}
              onClick={() => this.props.dispatch(unfreezeContent())}
            >
              View Bag
            </Link>
            <button className="checkout">Check out</button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cartData: state.cartData,
  selectedCurrency: state.selectedCurrency,
});

export default connect(mapStateToProps)(CartOverlay);
