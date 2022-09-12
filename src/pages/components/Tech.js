import React from "react";
import { Query } from "@apollo/client/react/components";
import { queryTech } from "../../gql/Query";
import TechListing from "../containers/TechListing";

class Tech extends React.Component {
  render() {
    return (
      <Query query={queryTech} pollInterval={1000}>
        {({ loading, error, data }) => {
          console.log("loading", loading);
          console.log("error", error);
          console.log("fetched data", data);
          if (data) {
            return <TechListing fetched={data.category} />;
          }
        }}
      </Query>
    );
  }
}

export default Tech;
