import React from "react";
import { connect } from "react-redux";

class AllProductsListing extends React.Component {
  renderAllProducts = (allProducts) => {
    console.log("why you not responding", allProducts);
    return allProducts.map((product) => (
      <div key={product.name}>{product.name}</div>
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
              {this.renderAllProducts(this.props.allProducts.data[0].products)}
            </>
          ) : (
            <h5>There are no products</h5>
          )}
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({ allProducts: state.allData });

export default connect(mapStateToProps)(AllProductsListing);
