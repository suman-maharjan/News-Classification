export const getCookie = (name: string, cookies?: any) => {
  if (typeof window == "undefined") return null;
  return `; ${cookies ? cookies : document.cookie}`.match(
    `;\\s*${name}=([^;]+)`
  )?.[1];
};

export interface IAuthState {
  isUserLoggedIn: boolean;
}

export const intialState: IAuthState = {
  isUserLoggedIn: false,
};
