import React from "react";
import { connect } from "react-redux";
import { renderPreferedPriceCurrency, showSize } from "../../Utils/utilities";
import { xAxis, yAxis } from "../../assets/axes";

class CartOverlay extends React.Component {
  render() {
    return (
      <div>
        {this.props.cartData.cart && this.props.cartData.cart.length > 0 ? (
          this.props.cartData.cart.map((prodObj) => (
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
              <div className="mid">
                <div className="increment">
                  <span className="x">{xAxis}</span>
                  <span className="y">{yAxis}</span>
                </div>
                <div className="count">
                  <span>2</span>
                </div>
                <div className="decrement">
                  <span>{xAxis}</span>
                </div>
              </div>
              <div className="right-side">
                <img src={prodObj.product.gallery[0]} />
              </div>
            </div>
            // <div className="total">
            //   <p className="total-heading">I'd rather be</p>
            //   <p className="total-price"></p>
            // </div>
          ))
        ) : (
          <div>There's no product in your cart</div>
        )}

        {/* if (this.props.cartData.cart && this.props.cartData.cart.length > 0) {
          return this.props.cartData.cart.map((prodObj) => (
    
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
                                            style={{ backgroundColor: item.value }}
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
                  <div className="increment">
                    <span className="x">{xAxis}</span>
                    <span className="y">{yAxis}</span>
                  </div>
                  <div className="count">
                    <span>2</span>
                  </div>
                  <div className="decrement">
                    <span>{xAxis}</span>
                  </div>
                </div>
                <div className="right-side">
                  <img src={prodObj.product.gallery[0]} />
                </div>
              </div>
              <div className="total">
                <p className="total-heading">I'd rather be</p>
                <p className="total-price"></p>
              </div>
          ));
        } else {
          <div>There's no product in your cart</div>;
        } */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartData: state.cartData,
  selectedCurrency: state.selectedCurrency,
});

export default connect(mapStateToProps)(CartOverlay);
