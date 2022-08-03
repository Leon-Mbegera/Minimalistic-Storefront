import React from "react";
import { allData } from "../gql/Query";
import { Query } from "react-apollo";

class WrappedProductListing extends React.Component {
  render() {
    return (
      <Query query={allData} pollInterval={500}>
        {({ loading, error, data }) => {
          console.log("loading", loading);
          console.log("error", error);
          console.log("fetched data", data);
          if (loading) return <p>Loading...</p>;
          // if (error) return <p>Error :( </p>;
          // if (loading && this.state.loadingState) {
          //   return <p>Loading...</p>;
          // } else {
          //   this.setState({ loadingState: false });
          // }
          return data?.categories.map((category) => (
            <div key={category.name}>
              <p>{category.name}</p>
            </div>
          ));
        }}
      </Query>
    );
  }
}

export default WrappedProductListing;
