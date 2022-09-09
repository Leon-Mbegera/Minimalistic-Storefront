import React from "react";
import { Query } from "react-apollo";
import { queryCommand } from "../../gql/Query";
import { connect } from "react-redux";
import { allDataSuccess } from "../../redux/index";

class TestComponent extends React.Component {
  render() {
    return (
      <Query query={queryCommand} pollInterval={1000}>
        {({ loading, error, data }) => {
          console.log("loading", loading);
          console.log("error", error);
          console.log("fetched data", data);
          if (loading) return <p>loading...</p>;
          if (data) this.props.dispatch(allDataSuccess(data.categories));
          return;
        }}
      </Query>
    );
  }
}

export default connect()(TestComponent);
