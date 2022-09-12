import React from "react";
import { Query } from "@apollo/client/react/components";
import { queryAll } from "../../gql/Query";
import AllProductsListing from "../containers/AllProductsListing";

class AllProducts extends React.Component {
  render() {
    return (
      <Query query={queryAll} pollInterval={1000}>
        {({ loading, error, data }) => {
          console.log("loading", loading);
          console.log("error", error);
          console.log("fetched data", data);
          if (data) {
            return <AllProductsListing fetched={data.category} />;
          }
        }}
      </Query>
    );
  }
}

export default AllProducts;
