import React from "react";
import { addToCart } from "../../redux/index";
import { showSize, makeIt } from "../../Utils/utilities";
import { connect } from "react-redux";
import withPageParamsHOC from "../components/HOC/PageParamsHOC";

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      currentView: 0,
      attrOptions: {},
      quantity: 1,
    };
  }

  componentDidMount() {
    const selectedProduct = this.props.allData.data
      .find((cat) => cat.name === this.props.pageParams.category)
      ?.products.find((prod) => prod.id === this.props.pageParams.id);
    this.setState((prevState) => {
      return {
        ...prevState,
        product: selectedProduct,
        attrOptions: makeIt(
          selectedProduct.attributes.map((attr) => {
            return { [attr.name]: attr.items[0].value };
          })
        ),
      };
    });
  }

  pushProduct = () => {
    this.props.dispatch(addToCart({ ...this.state }));
  };

  changeView = (idx) => {
    this.setState((prevView) => {
      return { ...prevView, currentView: idx };
    });
  };

  changeAttrOpt = (name, value) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        attrOptions: { ...prevState.attrOptions, [name]: value },
      };
    });
  };

  displayedPrice = (pricesArr) => {
    const shownPrice = pricesArr?.find(
      (price) => price.currency.label === this.props.selectedCurrency.label
    );
    return shownPrice;
  };

  render() {
    return (
      <>
        <div className="product-wrapper">
          <div className="product-images">
            <div className="smaller-images">
              {this.state.product?.gallery.map((gal, idx) => (
                <div
                  key={`image-${idx}`}
                  onClick={() => this.changeView(idx)}
                  style={
                    this.state.currentView === idx
                      ? { border: "1px solid #5ECE7B" }
                      : null
                  }
                >
                  <img src={gal} alt={`${idx}`} />
                </div>
              ))}
            </div>
            <div className="bigger-image">
              <img
                src={this.state.product?.gallery[this.state.currentView]}
                alt="bigger"
              />
            </div>
          </div>
          <aside className="product-details">
            <div className="product-heading">
              <p className="brand">{this.state.product?.brand}</p>
              <p className="name">{this.state.product?.name}</p>
            </div>
            <div className="attributes">
              {this.state.product?.attributes &&
              this.state.product?.attributes.length > 0
                ? this.state.product.attributes.map((object) => {
                    if (object.type === "text") {
                      return (
                        <div key={object.id} style={{ marginBottom: "22px" }}>
                          <p className="attributes-size">{object.name}:</p>
                          <div className="attributes-size-div">
                            {object.items && object.items.length > 0
                              ? object.items.map((item) => (
                                  <div
                                    key={item.id}
                                    className={
                                      item.value ===
                                      this.state.attrOptions[object.name]
                                        ? "choice"
                                        : "size-box"
                                    }
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      this.changeAttrOpt(
                                        object.name,
                                        item.value
                                      )
                                    }
                                  >
                                    <div>
                                      {showSize(item.value, item.displayValue)}
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
                        <div key={object.id}>
                          <p className="attributes-color">{object.name}:</p>
                          <div className="attributes-color-div">
                            {object.items && object.items.length > 0
                              ? object.items.map((item) => (
                                  <div
                                    key={item.id}
                                    className="parent-box"
                                    style={
                                      item.value ===
                                      this.state.attrOptions[object.name]
                                        ? {
                                            border: "1px solid #5ECE7B",
                                            cursor: "pointer",
                                          }
                                        : { cursor: "pointer" }
                                    }
                                    onClick={() =>
                                      this.changeAttrOpt(
                                        object.name,
                                        item.value
                                      )
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
            <div className="text-box">
              <p className="price-size">Price:</p>
              <div className="pdp-displayed-currency">
                <span className="price-symbol">
                  {
                    this.displayedPrice(this.state.product?.prices)?.currency
                      .symbol
                  }
                </span>
                <span className="product-price">
                  {this.displayedPrice(this.state.product?.prices)?.amount}
                </span>
              </div>
            </div>
            <div className="action-button">
              <button type="button" onClick={this.pushProduct}>
                Add to Cart
              </button>
            </div>
            <div className="description">
              <div
                dangerouslySetInnerHTML={{
                  __html: this.state.product?.description,
                }}
              />
            </div>
          </aside>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  allData: state.allData,
  selectedCurrency: state.selectedCurrency,
  cartData: state.cartData,
});

export default connect(mapStateToProps)(withPageParamsHOC(DetailsPage));
