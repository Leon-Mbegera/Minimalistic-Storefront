import React from "react";
import { connect } from "react-redux";
import { renderPreferedPriceCurrency, showSize } from "../../Utils/utilities";
import { xAxis, yAxis } from "../../assets/axes";
import { addToCart, removeFromCart } from "../../redux/index";

class CartPage extends React.Component {
  render() {
    return (
      <div className="cartPage-items-wrapper">
        {this.props.cartData.cart && this.props.cartData.cart.length > 0 ? (
          (console.log("from", this.props.cartData.cart),
          [...this.props.cartData.cart].map((prodObj) => (
            <div key={prodObj.product.id} className="cartPageItem">
              <div className="left-side">
                <div className="cartItem-heading">
                  <p className="brand-heading">{prodObj.product.brand}</p>
                  <p className="name-heading">{prodObj.product.name}</p>
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
                <div className="cartPageItem-attributes">
                  {prodObj.product.attributes &&
                  prodObj.product.attributes.length > 0
                    ? prodObj.product.attributes.map((object) => {
                        if (object.type === "text") {
                          return (
                            <div key={object.id} className="type-text">
                              <p className="attributes-size">{object.name}:</p>
                              <div className="attributes-size-div">
                                {object.items && object.items.length > 0
                                  ? object.items.map((item) => (
                                      <div
                                        key={item.id}
                                        className={
                                          item.value ===
                                            prodObj.attrOptions[object.name] &&
                                          object.name === "Size"
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
                              <p className="attributes-color">{object.name}:</p>
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
              <div className="right-side">
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
                <div>
                  <img src={prodObj.product.gallery[0]} alt="first of them" />
                </div>
              </div>
            </div>
          )))
        ) : (
          <div>There's no product in your cart</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartData: state.cartData,
  selectedCurrency: state.selectedCurrency,
});

export default connect(mapStateToProps)(CartPage);
