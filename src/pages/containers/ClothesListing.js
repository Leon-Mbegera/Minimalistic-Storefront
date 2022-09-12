import React from "react";
import { connect } from "react-redux";
import { allDataSuccess } from "../../redux";
import ReusableComponent from "../../reusable/reusable";

class ClothesListing extends React.Component {
  componentDidMount() {
    this.props.dispatch(allDataSuccess(this.props.fetched));
  }

  render() {
    return (
      <>
        <section>
          {this.props.clothes && this.props.clothes.products.length > 0 ? (
            <>
              <div className="category-heading">{this.props.clothes.name}</div>
              <section className="grid-container">
                {this.props.clothes.products.map((product) => (
                  <ReusableComponent
                    key={product.id}
                    category={this.props.clothes.name}
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
  clothes: state.clothes,
  selectedCurrency: state.selectedCurrency,
});

export default connect(mapStateToProps)(ClothesListing);
