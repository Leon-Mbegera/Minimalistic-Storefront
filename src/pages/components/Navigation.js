import React from "react";
import { Query } from "@apollo/client/react/components";
import { fetchNavs } from "../../gql/Query";
import Navbar from "./Navbar";

class Navigation extends React.Component {
  render() {
    return (
      <Query query={fetchNavs} pollInterval={1000}>
        {({ data }) => {
          if (data) {
            return <Navbar navlinks={data.categories}/>;
          }
        }}
      </Query>
    );
  }
}

export default Navigation;