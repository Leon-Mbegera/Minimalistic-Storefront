import React from "react";
import { connect } from "react-redux";
import { allDataSuccess } from "../../redux";
import ReusableComponent from "../../reusable/reusable";

class TechListing extends React.Component {
  componentDidMount() {
    this.props.dispatch(allDataSuccess(this.props.fetched));
  }

  render() {
    return (
      <>
        <section>
          {this.props.tech && this.props.tech.products.length > 0 ? (
            <>
              <div className="category-heading">{this.props.tech.name}</div>
              <section className="grid-container">
                {this.props.tech.products.map((product) => (
                  <ReusableComponent
                    key={product.id}
                    category={this.props.tech.name}
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
  tech: state.tech,
  selectedCurrency: state.selectedCurrency,
});
export default connect(mapStateToProps)(TechListing);
