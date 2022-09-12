import React from "react";
import { connect } from "react-redux";
import { allDataSuccess } from "../../redux";
import ReusableComponent from "../../reusable/reusable";

class AllProductsListing extends React.Component {
  componentDidMount() {
    this.props.dispatch(allDataSuccess(this.props.fetched));
  }

  render() {
    return (
      <>
        <section>
          {console.log("all props here", this.props)}
          {this.props.allProducts &&
          this.props.allProducts.products.length > 0 ? (
            <>
              <div className="category-heading">
                {this.props.allProducts.name}
              </div>
              <section className="grid-container">
                {this.props.allProducts.products.map((product) => (
                  <ReusableComponent
                    key={product.id}
                    category={this.props.allProducts.name}
                    product={product}
                    selectedCurrency={this.props.selectedCurrency}
                  />
                ))}
              </section>
            </>
          ) : (
            <h5>loading...</h5>
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
