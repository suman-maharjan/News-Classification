import ErrorSVG from "../assets/svg/ErrorSVG";
import SuccessSVG from "../assets/svg/SuccessSVG";

const ErrorComponent = ({
  message,
  type = AlertTypeEnum.ERROR,
}: {
  message: string;
  type?: AlertTypeEnum;
}) => {
  return (
    <div
      role="alert"
      className={`alert  ${
        type === AlertTypeEnum.ERROR ? "alert-error" : "alert-success"
      }`}
    >
      {type === AlertTypeEnum.ERROR ? <ErrorSVG /> : <SuccessSVG />}
      <span>{message ?? `Error! Task failed successfully.`}</span>
    </div>
  );
};

export enum AlertTypeEnum {
  ERROR = "error",
  SUCCESS = "success",
}

export default ErrorComponent;
