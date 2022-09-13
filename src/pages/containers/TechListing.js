import React from "react";
import { connect } from "react-redux";
import ReusableComponent from "../../reusable/reusable";

class TechListing extends React.Component {
  render() {
    return (
      <>
        <section>
          {this.props.techProducts &&
          this.props.techProducts.products.length > 0 ? (
            <>
              <div className="category-heading">
                {this.props.techProducts.name}
              </div>
              <section className="grid-container">
                {this.props.techProducts.products.map((product) => (
                  <ReusableComponent
                    key={product.id}
                    category={this.props.techProducts.name}
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
export default connect(mapStateToProps)(TechListing);
