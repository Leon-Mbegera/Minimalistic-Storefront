import React from "react";
import { connect } from "react-redux";

class CartOverlay extends React.Component {
  render() {
    if (this.props.cartData.cart && this.props.cartData.cart.length > 0) {
      return this.props.cartData.cart.map((prodObj) => (
        <div>{prodObj?.product?.name}</div>
      ));
    } else {
      <div>There's no product in your cart</div>;
    }
  }
}

const mapStateToProps = (state) => ({ cartData: state.cartData });

export default connect(mapStateToProps)(CartOverlay);
