import { useParams, } from "react-router-dom";

const withPageParamsHOC = (Component) => (props) => {
  const params = useParams();
  return <Component {...props} pageParams={params} />;
};

export default withPageParamsHOC;
