import React from "react";
import { connect } from "react-redux";

class CartPage extends React.Component {
  render() {
    if (this.props.cartData.cart && this.props.cartData.cart.length > 0) {
      return this.props.cartData.cart.map((product) => <div>{product.id}</div>);
    } else {
      <div>There's no product in your cart</div>;
    }
  }
}

const mapStateToProps = (state) => ({ cartData: state.cartData });

export default connect(mapStateToProps)(CartPage);
