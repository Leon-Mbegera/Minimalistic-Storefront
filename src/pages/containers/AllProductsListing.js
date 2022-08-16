import React from "react";
import { connect } from "react-redux";

class AllProductsListing extends React.Component {
  renderPreferedPriceCurrency = (product) => {
    const priceObject = product?.prices.find(
      (price) => price.currency.label === this.props.selectedCurrency.label
    );
    return priceObject;
  };

  renderAllProducts = (allProducts) => {
    console.log("why you not responding", allProducts);
    return allProducts.map((product) => (
      <div key={product.name} className="grid-item">
        <div className="image-box">
          <img src={product.gallery[0]} alt={product.gallery[0]} />
        </div>
        <div className="text-box">
          <p className="product-title">{product.name}</p>
          <div className="displayed-currency">
            <span className="price-symbol">
              {this.renderPreferedPriceCurrency(product).currency.symbol}
            </span>
            <span className="product-price">
              {this.renderPreferedPriceCurrency(product).amount}
            </span>
          </div>
        </div>
      </div>
    ));
  };

  render() {
    return (
      <>
        <section>
          {this.props.allProducts && this.props.allProducts.data.length > 0 ? (
            <>
              <div>
                <h1>{this.props.allProducts.data[0].name}</h1>
              </div>
              <section className="grid-container">
                {this.renderAllProducts(
                  this.props.allProducts.data[0].products
                )}
              </section>
            </>
          ) : (
            <h5>There are no products</h5>
          )}
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  allProducts: state.allData,
  selectedCurrency: state.selectedCurrency,
});

export default connect(mapStateToProps)(AllProductsListing);
