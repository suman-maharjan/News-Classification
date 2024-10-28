import { createContext, useContext, useState } from "react";
import ToastComponent, { AlertTypeEnum } from "../components/ToastComponent";

export const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);

interface IToast {
  message: string;
  type: AlertTypeEnum;
  visible: boolean;
}

interface IShowToast {
  message: string;
  type: AlertTypeEnum;
  duration?: number;
}

const initialToastValue = {
  message: "",
  type: AlertTypeEnum.SUCCESS,
  visible: false,
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<IToast>(initialToastValue);

  const showToast = ({
    message,
    type = AlertTypeEnum.SUCCESS,
    duration,
  }: IShowToast) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast({ ...toast, visible: false, message: "" });
    }, duration || 5000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <ToastComponent message={toast.message} type={toast.type} />
      )}
    </ToastContext.Provider>
  );
};
