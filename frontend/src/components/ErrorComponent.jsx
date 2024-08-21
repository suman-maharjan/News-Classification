import ErrorSVG from "../assets/svg/ErrorSVG";
import PropTypes from "prop-types";
const ErrorComponent = ({ message }) => {
  return (
    <div role="alert" className="alert alert-error">
      <ErrorSVG />
      <span>{message ?? `Error! Task failed successfully.`}</span>
    </div>
  );
};

export default ErrorComponent;

ErrorComponent.propTypes = {
  message: PropTypes.string,
};
