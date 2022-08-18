import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.product = { product: null };
  }

  componentDidMount() {
    const selectedCategory = this.props.allProducts.find(
      (cat) => cat.name === this.props.category
    );
    const selectedProduct = selectedCategory.products.find(
      (prod) => prod.name === this.props.product.name
    );
    this.setProduct((prevProduct) => {
      return { ...prevProduct, product: selectedProduct };
    });
  }

  render() {
    return <>{this.product.name}</>;
  }
}

const WrappedDetailsPage = () => {
  const { Category, Product } = useParams();
  return (
    <DetailsPage
      allProducts={this.props.allProducts}
      category={Category}
      product={Product}
    />
  );
};

const mapStateToProps = (state) => ({ allProducts: state.allData });

export default connect(mapStateToProps)(WrappedDetailsPage);
