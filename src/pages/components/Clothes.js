import React from "react";
import { Query } from "@apollo/client/react/components";
import { queryClothes } from "../../gql/Query";
import ClothesListing from "../containers/ClothesListing";

class Clothes extends React.Component {
  render() {
    return (
      <Query query={queryClothes} pollInterval={1000}>
        {({ loading, error, data }) => {
          if (data) {
            return <ClothesListing clothProducts={data.category} />;
          }
        }}
      </Query>
    );
  }
}

export default Clothes;
