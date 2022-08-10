import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.product = {};
  }

  componentDidMount() {
    const selected = this.props.allProducts[0].products.find(
      (prod) => prod.id === this.props.id
    );
    this.setProduct(selected);
  }
}

const WrappedDetailsPage = () => {
  const { id } = useParams();
  return <DetailsPage props={id} />;
};

const mapStateToProps = (state) => ({ allProducts: state.allData });

export default connect(mapStateToProps)(WrappedDetailsPage);
