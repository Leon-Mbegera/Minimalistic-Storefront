import React from "react";
import { connect } from "react-redux";
import { renderPreferedPriceCurrency } from "../../Utils/utilities";

class CartOverlay extends React.Component {
  render() {
    if (this.props.cartData.cart && this.props.cartData.cart.length > 0) {
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
            <div className="cartItem-attributes"></div>
          </div>
          <div className="mid"></div>
          <div className="right-side"></div>
        </div>
      ));
    } else {
      <div>There's no product in your cart</div>;
    }
  }
}

const mapStateToProps = (state) => ({
  cartData: state.cartData,
  selectedCurrency: state.selectedCurrency,
});

export default connect(mapStateToProps)(CartOverlay);
