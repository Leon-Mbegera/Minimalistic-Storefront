import React from "react";
import { connect } from "react-redux";

class ProductListing extends React.Component {}

const mapStateToProps = (state) => ({ products: state.allData });

export default connect(mapStateToProps)(ProductListing);
