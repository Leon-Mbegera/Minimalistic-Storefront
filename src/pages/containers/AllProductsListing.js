import React from "react";
import { connect } from "react-redux";
import ReusableComponent from "../../reusable/reusable";

class AllProductsListing extends React.Component {
  render() {
    if (this.props.fetched && this.props.fetched.products.length > 0) {
      return (
        <>
          <section>
            <div className="category-heading">{this.props.fetched.name}</div>
            <section className="grid-container">
              {this.props.fetched.products.map((product) => (
                <ReusableComponent
                  key={product.id}
                  category={this.props.fetched.name}
                  product={product}
                  selectedCurrency={this.props.selectedCurrency}
                />
              ))}
            </section>
          </section>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
});

export default connect(mapStateToProps)(AllProductsListing);
