import cookie from "js-cookie";

export const setCookie = (key, value) => {
  cookie.set(key, value, { expires: 30 });
};

export const getCookie = (key) => {
  return cookie.get(key);
};

export const removeCookie = (key) => {
  cookie.remove(key);
};
