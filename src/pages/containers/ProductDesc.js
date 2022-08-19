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

  render() {
    return (
      <>
        <div className="product-wrapper">
          <div className="product-images">
            <div className="smaller-images">
              {this.state.product?.gallery.map((gal, idx) => (
                <div key={`image-${idx}`} onClick={() => this.changeView(idx)}>
                  <img src={gal} alt={`image-${idx}`} />
                </div>
              ))}
            </div>
            <div className="bigger-image">
              <img
                src={this.state.product?.gallery[this.state.currentView]}
                alt="image"
              />
            </div>
          </div>
          <aside className="product-details">
            <div className="product-heading">
              <p>{this.state.product?.brand}</p>
              <p>{this.state.product?.name}</p>
            </div>
            <div className="attribute-sizes">
              <p></p>
              <div>
                {this.state.product?.attributes[0].items.map(
                  ({ displayValue, id }) => (
                    <div key={id} className="size-box">
                      <span>{this.showSize(displayValue)}</span>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="available-colors"></div>
            <div className="price"></div>
            <div class="action-button"></div>
            <div className="description"></div>
          </aside>
        </div>
      </>
    );
  }
}

const WrappedDetailsPage = () => {
  const { Category, Id } = useParams();
  const { data } = useSelector((state) => state.allData);
  console.log("Loud", Category, Id, data);
  return <DetailsPage data={data} category={Category} productId={Id} />;
};

export default WrappedDetailsPage;
