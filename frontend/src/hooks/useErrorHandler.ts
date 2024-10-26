import axios from "axios";
import { useState } from "react";

export const useErrorHandler = () => {
  const [error, setError] = useState<string | null>(null);
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

    setError(errorMessage);
  };

  const clearError = (duration?: number): void => {
    const timeDuration = duration || 5000;
    setTimeout(() => {
      setError("");
    }, timeDuration);
  };

  return { error, handleError, clearError };
};
