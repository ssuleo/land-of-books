import Cookies from "js-cookie";
export const setCookie = (key, value) => {
  Cookies.set(key, value, { expires: 1, path: "/" });
};

export const removeCookie = (key) => {
  Cookies.remove(key);
};

export const getCookie = (key) => Cookies.get(key);