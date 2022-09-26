import React from "react";
import { Query } from "@apollo/client/react/components";
import { fetchNavsAndCurrencies } from "../../gql/Query";
import Navbar from "./Navbar";

class Navigation extends React.Component {
  render() {
    return (
      <>
        <Query query={fetchNavsAndCurrencies}>
          {({ data }) => {
            if (data) {
              return <Navbar navlinks={data.categories} currencies={data.currencies}/>;
            }
          }}
        </Query>
      </>
    );
  }
}

export default Navigation;