import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }

  componentDidMount() {
    const selectedCategory = this.props.data.find(
      (cat) => cat.name === this.props.category
    );
    const selectedProduct = selectedCategory.products.find(
      (prod) => prod.id === this.props.productId
    );
    console.log("found my product", selectedProduct);
    this.setState((prevProduct) => {
      return { ...prevProduct, product: selectedProduct };
    });
  }

  render() {
    return (
      <>
        <div className="product-wrapper">
          <div className="product-images">
            <div className="smaller-images"></div>
            <div className="bigger-image"></div>
          </div>
          <aside className="product-details"></aside>
        </div>
      </>
    );
  }
}

const WrappedDetailsPage = () => {
  const { Category, Id } = useParams();
  const { data } = useSelector((state) => state.allData);
  console.log("Loud", Category, Id, data);
  return <DetailsPage data={data} category={Category} productId={Id} />;
};

export default WrappedDetailsPage;
