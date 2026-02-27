import {
  findEmailApi,
  forgotPasswordApi,
  loginUserApi,
  logoutUserApi,
  regenerateEmail,
  registerUserApi,
  verifyableEmailApi,
  verifyUserApi,
} from "@/utils/apis/authApi";
import {
  IforgotPasswordUser,
  ILoginUser,
  IRegisterUser,
  IVerifyUser,
} from "@/utils/types/authTypes";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
  const { mutate: loginMutate, isPending: loginPending } = useMutation({
    mutationFn: async (data: ILoginUser) => await loginUserApi(data),
  });

  const { mutate: logoutMutate, isPending: logoutPending } = useMutation({
    mutationFn: async () => await logoutUserApi(),
  });

  const { mutate: registerMutate, isPending: registerPending } = useMutation({
    mutationFn: async (data: IRegisterUser) => await registerUserApi(data),
  });

  const { mutate: verifyUserMutate, isPending: verifyUserPending } =
    useMutation({
      mutationFn: async (data: IVerifyUser) => await verifyUserApi(data),
    });

  const {
    mutate: regenerateEmailMutate,
    isSuccess: regenerateEmailSuccess,
    isPending: regenerateEmailPending,
  } = useMutation({
    mutationFn: async (email: string) => {
      const response = await regenerateEmail(email);
      return response.data;
    },
  });

  const { mutate: verifyableEmailMutate, isPending: verifyableEmailPending } =
    useMutation({
      mutationFn: async (email: string) => {
        const response = await verifyableEmailApi(email);
        return response.data;
      },
    });

  const { mutate: findEmailMutate, isPending: findEmailPending } = useMutation({
    mutationFn: async (email: string) => {
      const response = await findEmailApi(email);
      return response.data;
    },
  });

  const { mutate: forgotPasswordMutate, isPending: forgotPasswordPending } =
    useMutation({
      mutationFn: async (data: IforgotPasswordUser) => {
        const response = await forgotPasswordApi(data);
        return response.data;
      },
    });

  return {
    loginMutate,
    loginPending,
    logoutMutate,
    logoutPending,
    registerMutate,
    registerPending,
    verifyUserMutate,
    verifyUserPending,
    regenerateEmailMutate,
    regenerateEmailSuccess,
    regenerateEmailPending,
    verifyableEmailMutate,
    verifyableEmailPending,
    findEmailMutate,
    findEmailPending,
    forgotPasswordMutate,
    forgotPasswordPending,
  };
};
