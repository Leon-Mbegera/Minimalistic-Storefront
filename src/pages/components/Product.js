import React from "react";
import { Query } from "@apollo/client/react/components";
import { fetchProduct } from "../../gql/Query";
import withPageParamsHOC from "./HOC/PageParamsHOC";
import DetailsPage from "../containers/ProductDesc";

class Product extends React.Component {
  render() {
    return (
      <Query
        query={fetchProduct(this.props.pageParams.id)}
        >
        {({ data }) => {
          if (data) {
            console.log("at Q", data.product)
            return <DetailsPage productDetails={data.product} />;
          }
        }}
      </Query>
    );
  }
}

export default withPageParamsHOC(Product);
