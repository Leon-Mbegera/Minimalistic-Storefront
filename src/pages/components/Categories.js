import React from "react";
import { Query } from "@apollo/client/react/components";
import { fetchCategory } from "../../gql/Query";
import withPageParamsHOC from "./HOC/PageParamsHOC";
import Category from "../containers/Category";

class Categories extends React.Component {
  render() {
    return (
      <Query query={fetchCategory(this.props.pageParams.categoryName)} pollInterval={1000}>
        {({ data }) => {
          if (data) {
            return <Category catProducts={data.category} />;
          }
        }}
      </Query>
    );
  }
}

export default withPageParamsHOC(Categories);