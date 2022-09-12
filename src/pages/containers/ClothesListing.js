import React from "react";
import { connect } from "react-redux";
import ReusableComponent from "../../reusable/reusable";

class ClothesListing extends React.Component {
  render() {
    return (
      <>
        <section>
          {this.props.clothProducts &&
          this.props.clothProducts.products.length > 0 ? (
            <>
              <div className="category-heading">
                {this.props.clothProducts.name}
              </div>
              <section className="grid-container">
                {this.props.clothProducts.products.map((product) => (
                  <ReusableComponent
                    key={product.id}
                    category={this.props.clothProducts.name}
                    product={product}
                    selectedCurrency={this.props.selectedCurrency}
                  />
                ))}
              </section>
            </>
          ) : (
            <h5>Loading...</h5>
          )}
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedCurrency: state.selectedCurrency,
});

export default connect(mapStateToProps)(ClothesListing);
