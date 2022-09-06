import React from "react";
import { connect } from "react-redux";
import ReusableComponent from "../../reusable/reusable";

class TechListing extends React.Component {
  render() {
    return (
      <>
        <section>
          {this.props.allProducts && this.props.allProducts.data.length > 0 ? (
            <>
              <div className="category-heading">
                {this.props.allProducts.data[2].name}
              </div>
              <section className="grid-container">
                {this.props.allProducts.data[2].products.map((product) => (
                  <ReusableComponent
                    key={product.name}
                    category={this.props.allProducts.data[2].name}
                    product={product}
                    selectedCurrency={this.props.selectedCurrency}
                  />
                ))}
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
export default connect(mapStateToProps)(TechListing);
