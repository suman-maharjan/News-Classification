import ErrorSVG from "../assets/svg/ErrorSVG";
import PropTypes from "prop-types";
import SuccessSVG from "../assets/svg/SuccessSVG";
const ErrorComponent = ({ message, type }) => {
  return (
    <div
      role="alert"
      className={`alert  ${
        type === AlertType.ERROR ? "alert-error" : "alert-success"
      }`}
    >
      {type === AlertType.ERROR ? <ErrorSVG /> : <SuccessSVG />}
      <span>{message ?? `Error! Task failed successfully.`}</span>
    </div>
  );
};

export const AlertType = {
  ERROR: "error",
  SUCCESS: "success",
};

export default ErrorComponent;

ErrorComponent.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf([AlertType.ERROR, AlertType.SUCCESS]), // Ensuring type is either "error" or "success"
};

ErrorComponent.defaultProps = {
  type: AlertType.ERROR, // Setting the default to "error"
};
