import React from "react";
import { connect } from "react-redux";
import { renderPreferedPriceCurrency, showSize } from "../../Utils/utilities";
import { xAxis, yAxis } from "../../assets/axes";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/index";

class CartOverlay extends React.Component {
  currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  getTotal() {
    let calculatedTotal = 0;
    let quantityCount = 0;
    this.props.cartData.cart.map((prodObj) => {
      quantityCount += prodObj.quantity;
      return (calculatedTotal +=
        renderPreferedPriceCurrency(
          prodObj.product,
          this.props.selectedCurrency
        )?.amount * prodObj.quantity);
    });
    return [
      calculatedTotal.toLocaleString(undefined, this.currencyOptions),
      quantityCount,
    ];
  }

  incrementQuantity = (prodObj) => {
    this.props.dispatch(addToCart(prodObj));
  };

  decrementQuantity = (prodObj) => {
    this.props.dispatch(removeFromCart(prodObj));
  };

  render() {
    return (
      <>
        <div className="cartOverlay-heading">
          <span className="my-bag">My Bag,</span>{" "}
          <span className="q-count">{this.getTotal()[1]} items</span>
        </div>
        <div className="items-wrapper">
          {this.props.cartData.cart && this.props.cartData.cart.length > 0 ? (
            (console.log("from", this.props.cartData.cart),
            [...this.props.cartData.cart].map((prodObj) => (
              <div key={prodObj.product.id} className="cartItem">
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
                        )?.amount
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
                    onClick={() => this.incrementQuantity(prodObj)}
                  >
                    <span className="x">{xAxis}</span>
                    <span className="y">{yAxis}</span>
                  </div>
                  <div className="count">
                    <span>{prodObj.quantity}</span>
                  </div>
                  <div
                    className="decrement"
                    onClick={() => this.decrementQuantity(prodObj)}
                  >
                    <span>{xAxis}</span>
                  </div>
                </div>
                <div className="right-side">
                  <img src={prodObj.product.gallery[0]} alt="first of them" />
                </div>
              </div>
            )))
          ) : (
            <div>There's no product in your cart</div>
          )}
        </div>
        <div className="total">
          <p>Total</p>
          <div>
            <span>{this.props.selectedCurrency.symbol}</span>
            <span>{this.getTotal()[0]}</span>
          </div>
        </div>
        <div className="cart-buttons">
          <button className="view-bag">
            <Link to="#" style={{ textDecoration: "none", color: "#1D1F22" }}>
              View Bag
            </Link>
          </button>
          <button className="checkout">Check out</button>
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
