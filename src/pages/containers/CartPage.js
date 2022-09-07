import React from "react";
import { connect } from "react-redux";
import {
  renderPreferedPriceCurrency,
  showSize,
  incrementQuantity,
  decrementQuantity,
  getTotal,
  calcTax,
} from "../../Utils/utilities";
import { longX, longY } from "../../assets/axes";
import { caretleft, caretright } from "../../assets/shift";
import { addToCart, removeFromCart } from "../../redux/index";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    [...this.props.cartData.cart].map((prodObj, id) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          [id]: 0,
        };
      });
      return null;
    });
  }

  shiftleft = (id) => {
    if (this.state[id] === 0) return;
    this.setState((prevState) => ({
      ...prevState,
      [id]: ({ ...prevState }[id] -= 1),
    }));
  };

  shiftright = (gallery, id) => {
    if (this.state[id] === gallery.length - 1) return;
    this.setState((prevState) => ({
      ...prevState,
      [id]: ({ ...prevState }[id] += 1),
    }));
  };

  render() {
    return (
      <>
        <div className="cart-page-heading">Cart</div>
        <div className="cartPage-items-wrapper">
          {this.props.cartData.cart && this.props.cartData.cart.length > 0 ? (
            (console.log("from", this.props.cartData.cart),
            [...this.props.cartData.cart].map((prodObj, id) => (
              <div key={`item-${id}`} className="cartPageItem">
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
                <div className="right-side">
                  <div className="mid">
                    <div
                      className="increment"
                      onClick={() =>
                        incrementQuantity(
                          prodObj,
                          this.props.dispatch,
                          addToCart
                        )
                      }
                    >
                      <span className="x">{longX}</span>
                      <span className="y">{longY}</span>
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
                      <span>{longX}</span>
                    </div>
                  </div>
                  <div className="image-side">
                    <img
                      src={prodObj.product.gallery[this.state[id]]}
                      alt="first of them"
                    />
                    {prodObj.product.gallery.length > 1 ? (
                      <>
                        <div
                          className="caret-left"
                          onClick={() => this.shiftleft(id)}
                        >
                          {caretleft}
                        </div>
                        <div
                          className="caret-right"
                          onClick={() =>
                            this.shiftright(prodObj.product.gallery, id)
                          }
                        >
                          {caretright}
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            )))
          ) : (
            <div>There's no product in your cart</div>
          )}
        </div>
        <div className="summation">
          <table>
            <tbody>
              <tr className="tax">
                <td className="title">Tax 21%:</td>
                <td>
                  <span>{this.props.selectedCurrency.symbol}</span>
                  {calcTax(
                    this.props.cartData.cart,
                    this.props.selectedCurrency
                  )}
                </td>
              </tr>
              <tr className="quantify">
                <td className="title">Quantity:</td>
                <td>
                  {
                    getTotal(
                      this.props.cartData.cart,
                      this.props.selectedCurrency
                    )[1]
                  }
                </td>
              </tr>
              <tr className="cost-summation">
                <td className="title">Total:</td>
                <td>
                  <span>{this.props.selectedCurrency.symbol}</span>
                  {
                    getTotal(
                      this.props.cartData.cart,
                      this.props.selectedCurrency
                    )[0]
                  }
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" className="order">
            Order
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cartData: state.cartData,
  selectedCurrency: state.selectedCurrency,
});

export default connect(mapStateToProps)(CartPage);
