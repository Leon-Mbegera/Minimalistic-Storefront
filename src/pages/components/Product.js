import React from "react";
import { Query } from "@apollo/client/react/components";
import { generateCommand } from "../../gql/Query";
import withPageParamsHOC from "./HOC/PageParamsHOC";
import DetailsPage from "../containers/ProductDesc";

class Product extends React.Component {
  render() {
    return (
      <Query
        query={generateCommand(this.props.pageParams.id)}
        pollInterval={1000}
      >
        {({ loading, error, data }) => {
          if (data) {
            return <DetailsPage productDetails={data.product} />;
          }
        }}
      </Query>
    );
  }
}

export default withPageParamsHOC(Product);
