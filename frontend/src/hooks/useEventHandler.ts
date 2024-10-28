import axios from "axios";
import { useToast } from "../context/ToastContext";
import { AlertTypeEnum } from "../components/ToastComponent";

export const useEventHandler = () => {
  const { showToast } = useToast();
  const handleError = (error: unknown) => {
    console.log(error);

    let errorMessage = "Something went wrong!!";

    if (axios.isAxiosError(error)) {
      if (error.response) {
        errorMessage = error.response.data.msg || "An error occurred";
      } else if (error.request) {
        errorMessage = "Network Error. Please Check your internet connection";
      } else {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    // This will show the error
    showToast({ message: errorMessage, type: AlertTypeEnum.ERROR });
  };

  const handleSuccess = (successMessage: string) => {
    showToast({ message: successMessage });
  };

  return { handleError, handleSuccess };
};
