export const setToken = (value) => {
  return localStorage.setItem("access-token", value);
};

export const getToken = () => {
  return localStorage.getItem("access-token");
};

export const removeToken = () => {
  return localStorage.removeItem("access-token");
};
