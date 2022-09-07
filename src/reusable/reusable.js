import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { whiteCart, whiteWheel } from "../assets/whiteShoppingCart";
import { renderPreferedPriceCurrency, makeIt } from "../Utils/utilities";
import { addToCart } from "../redux/index";

class ReusableComponent extends React.Component {
  state = {
    ruleSet: { display: "none" },
    product: null,
    attrOptions: {},
    quantity: 1,
  };

  sendtocart = () => {
    this.props.dispatch(addToCart({ ...this.state }));
  };

  componentDidMount() {
    this.setState((prevState) => {
      console.log("at reusable", {
        ...prevState,
        product: this.props.product,
        attrOptions: makeIt(
          this.props.product.attributes.map((attr) => {
            return { [attr.name]: attr.items[0].value };
          })
        ),
      });
      return {
        ...prevState,
        product: this.props.product,
        attrOptions: makeIt(
          this.props.product.attributes.map((attr) => {
            return { [attr.name]: attr.items[0].value };
          })
        ),
      };
    });
  }

  render() {
    return (
      <Link
        to={`/Categories/${this.props.category}/${this.props.product.id}`}
        style={{ textDecoration: "none", color: "#000000" }}
      >
        <div
          key={this.props.product.name}
          className="grid-item"
          onMouseEnter={(e) => {
            this.setState((prevState) => ({
              ...prevState,
              ruleSet: { display: "block" },
            }));
          }}
          onMouseLeave={(e) => {
            this.setState((prevState) => ({
              ...prevState,
              ruleSet: { display: "none" },
            }));
          }}
        >
          <div className="image-box">
            <img
              src={this.props.product.gallery[0]}
              alt={this.props.product.gallery[0]}
            />
          </div>
          <div
            className="add-to-cart"
            style={this.state.ruleSet}
            onClick={this.sendtocart}
          >
            <span className="white-cart">{whiteCart}</span>
            <span className="left-white-wheel">{whiteWheel}</span>
            <span className="right-white-wheel">{whiteWheel}</span>
          </div>
          <div className="text-box">
            <p className="product-title">
              {this.props.product.brand} {this.props.product.name}
            </p>
            <div className="displayed-currency">
              <span className="price-symbol">
                {
                  renderPreferedPriceCurrency(
                    this.props.product,
                    this.props.selectedCurrency
                  ).currency.symbol
                }
              </span>
              <span className="product-price">
                {
                  renderPreferedPriceCurrency(
                    this.props.product,
                    this.props.selectedCurrency
                  ).amount
                }
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default connect()(ReusableComponent);
