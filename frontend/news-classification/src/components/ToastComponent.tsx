import ErrorSVG from "../assets/svg/ErrorSVG";
import SuccessSVG from "../assets/svg/SuccessSVG";

const ToastComponent = ({
  message,
  type = AlertTypeEnum.ERROR,
}: {
  message: string;
  type?: AlertTypeEnum;
}) => {
  return (
    <div
      role="alert"
      className={`
        absolute bottom-4 right-4
        alert  ${type === AlertTypeEnum.ERROR ? "alert-error" : "alert-success"}
        max-w-xs px-4 py-2 rounded-lg shadow-lg"
      `}
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

export default ToastComponent;
