import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null, currentView: 0, attrOptions: {} };
  }

  componentDidMount() {
    const selectedProduct = this.props.data
      .find((cat) => cat.name === this.props.category)
      ?.products.find((prod) => prod.id === this.props.productId);

    console.log("found my product", selectedProduct);
    this.setState((prevState) => {
      return {
        ...prevState,
        product: selectedProduct,
        attrOptions: this.makeIt(
          selectedProduct.attributes.map((attr) => {
            return { [attr.name]: attr.items[0].value };
          })
        ),
      };
    });
  }

  changeView = (idx) => {
    this.setState((prevView) => {
      return { ...prevView, currentView: idx };
    });
  };

  makeIt = (array) => {
    const bigObject = Object.assign({}, ...array);
    return bigObject;
  };

  showSize = (value, displayValue) => {
    switch (value) {
      case "40":
        return "XS";
      case "41":
        return "S";
      case "42":
        return "M";
      case "43":
        return "L";
      case "512G":
        return displayValue;
      case "1T":
        return displayValue;
      case "Yes":
        return displayValue;
      case "No":
        return displayValue;
      default:
        return;
    }
  };

  displayedPrice = (pricesArr) => {
    const shownPrice = pricesArr?.find(
      (price) => price.currency.label === this.props.currency?.label
    );
    return shownPrice;
  };

  render() {
    return (
      <>
        <div className="product-wrapper">
          <div className="product-images">
            <div className="smaller-images">
              {console.log("state", this.state)};
              {this.state.product?.gallery.map((gal, idx) => (
                <div key={`image-${idx}`} onClick={() => this.changeView(idx)}>
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
                                  <div key={item.id} className="size-box">
                                    <div>
                                      {this.showSize(
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
                        <div key={object.id}>
                          <p className="attributes-color">Color:</p>
                          <div className="attributes-color-div">
                            {object.items && object.items.length > 0
                              ? object.items.map((item) => (
                                  <div
                                    key={item.id}
                                    className="swatch-box"
                                    style={{ backgroundColor: item.value }}
                                  ></div>
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
              <button type="button">Add to Cart</button>
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

const WrappedDetailsPage = () => {
  const { Category, Id } = useParams();
  const { allData, selectedCurrency } = useSelector((state) => ({
    allData: state.allData,
    selectedCurrency: state.selectedCurrency,
  }));
  console.log("Loud", Category, Id, allData.data);
  return (
    <DetailsPage
      data={allData.data}
      category={Category}
      productId={Id}
      currency={selectedCurrency}
    />
  );
};

export default WrappedDetailsPage;
