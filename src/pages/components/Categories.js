import React from "react";
import { Query } from "urql";
import { fetchCategory } from "../../gql/Query";
import withPageParamsHOC from "./HOC/PageParamsHOC";
import Category from "../containers/Category";
import { Navigate } from "react-router-dom";

class Categories extends React.Component {
  render() {
    if (this.props.pageParams.categoryName) {
      return (
        <Query query={fetchCategory(this.props.pageParams.categoryName)}>
          {({ data }) => {
            if (data) {
              return <Category catProducts={data.category} />;
            }
          }}
        </Query>
      );
    } else {
      return <Navigate to="/all" />
    }  
  }
}

export default withPageParamsHOC(Categories);