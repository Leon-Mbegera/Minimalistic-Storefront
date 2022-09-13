import { useParams, useNavigate } from "react-router-dom";

const withPageParamsHOC = (Component) => (props) => {
  const params = useParams();
  const navigate = useNavigate();
  return <Component {...props} pageParams={params} navigate={navigate} />;
};

export default withPageParamsHOC;
