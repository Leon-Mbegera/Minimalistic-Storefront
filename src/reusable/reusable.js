import React from "react";
import { Link } from "react-router-dom";
import { whiteCart, whiteWheel } from "../assets/whiteShoppingCart";

class ReusableComponent extends React.Component {
  renderPreferedPriceCurrency = (product) => {
    const priceObject = product?.prices.find(
      (price) => price.currency.label === this.props.selectedCurrency?.label
    );
    return priceObject;
  };

  handleItemClick = (product, category) => {
    return <Link to={`/Categories/${category}/${product.name}`}></Link>;
  };

  render() {
    return (
      <div
        key={this.props.product.name}
        className="grid-item"
        onClick={() =>
          this.handleItemClick(this.props.product, this.props.category)
        }
      >
        <div className="image-box">
          <img
            src={this.props.product.gallery[0]}
            alt={this.props.product.gallery[0]}
          />
        </div>
        <div className="add-to-cart">
          <span className="white-cart">{whiteCart}</span>
          <span className="left-white-wheel">{whiteWheel}</span>
          <span className="right-white-wheel">{whiteWheel}</span>
        </div>
        <div className="text-box">
          <p className="product-title">{this.props.product.name}</p>
          <div className="displayed-currency">
            <span className="price-symbol">
              {
                this.renderPreferedPriceCurrency(this.props.product).currency
                  .symbol
              }
            </span>
            <span className="product-price">
              {this.renderPreferedPriceCurrency(this.props.product).amount}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ReusableComponent;
