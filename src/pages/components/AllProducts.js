import React from "react";
import { Query } from "@apollo/client/react/components";
import { queryAll } from "../../gql/Query";
import AllProductsListing from "../containers/AllProductsListing";

class AllProducts extends React.Component {
  render() {
    return (
      <Query query={queryAll} pollInterval={1000} delay={true}>
        {({ data }) => {
          if (data) return <AllProductsListing allProducts={data.category} />;
        }}
      </Query>
    );
  }
}

export default AllProducts;
