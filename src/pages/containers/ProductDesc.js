import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null, currentView: 0 };
  }

  componentDidMount() {
    const selectedCategory = this.props.data.find(
      (cat) => cat.name === this.props.category
    );
    const selectedProduct = selectedCategory.products.find(
      (prod) => prod.id === this.props.productId
    );
    console.log("found my product", selectedProduct);
    this.setState((prevProduct) => {
      return { ...prevProduct, product: selectedProduct };
    });
  }

  changeView = (idx) => {
    this.setState((prevView) => {
      return { ...prevView, currentView: idx };
    });
  };

  showSize = (displayValue) => {
    if (displayValue === "40") {
      return "XS";
    } else if (displayValue === "41") {
      return "S";
    } else if (displayValue === "42") {
      return "M";
    } else if (displayValue === "43") {
      return "L";
    } else {
      return;
    }
  };

  displayedPrice = (product) => {
    const priceObject = product?.prices.find(
      (price) => price.currency.label === this.props.selectedCurrency?.label
    );
    return priceObject;
  };

  render() {
    return (
      <>
        <div className="product-wrapper">
          <div className="product-images">
            <div className="smaller-images">
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
                ? this.state.product.attributes.reverse().map((object) => {
                    if (object.type === "text") {
                      return (
                        <div key={object.id}>
                          <p className="attributes-size">Size:</p>
                          <div className="attributes-size-div">
                            {object.items && object.items.length > 0
                              ? object.items.map((item) => (
                                  <div key={item.id} className="size-box">
                                    <div>
                                      {this.showSize(item.displayValue)}
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
            <div className="price">
              <p className="price">Price:</p>
              {/* <p>{this.state.product.}</p> */}
            </div>
            <div className="action-button"></div>
            <div className="description"></div>
          </aside>
        </div>
      </>
    );
  }
}

const WrappedDetailsPage = () => {
  const { Category, Id } = useParams();
  const { data, selectedCurrency } = useSelector((state) => ({
    data: state.allData,
    selectedCurrency: state.selectedCurrency,
  }));
  console.log("Loud", Category, Id, data);
  return (
    <DetailsPage
      data={data}
      category={Category}
      productId={Id}
      currency={selectedCurrency}
    />
  );
};

export default WrappedDetailsPage;
