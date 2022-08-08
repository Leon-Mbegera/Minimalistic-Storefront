import React from "react";
import { connect } from "react-redux";

class TechListing extends React.Component {
  renderAllProducts = (allProducts) => {
    return allProducts.map((product) => <div key={product.name}></div>);
  };

  render() {
    return (
      <>
        <section>
          {this.props.allProducts && this.props.allProducts.length > 0 ? (
            <>
              <div>
                <h1>{this.props.allProducts[2].name}</h1>
              </div>
              {this.renderAllProducts(this.props.allProducts[2].products)}
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

export default connect(mapStateToProps)(TechListing);