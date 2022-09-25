import React from "react";
import { connect } from "react-redux";
import ReusableComponent from "../../reusable/reusable";

class Category extends React.Component {
  render() {
    if (this.props.catProducts && this.props.catProducts.products.length > 0) {
      return (
        <>
          <section>
            <div className="category-heading">
              {this.props.catProducts.name}
            </div>
            <section className="grid-container">
              {this.props.catProducts.products.map((product) => (
                <ReusableComponent
                  key={product.id}
                  category={this.props.catProducts.name}
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

export default connect(mapStateToProps)(Category);