import React from "react";
import { allData } from "../gql/Query";
import { Query } from "react-apollo";

class WrappedProductListing extends React.Component {
  render() {
    return (
      <Query query={allData}>
        {(loading, error, data) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :( </p>;
          console.log("fetched data", data);
          return <div>{data}</div>;
        }}
      </Query>
    );
  }
}

export default WrappedProductListing;
