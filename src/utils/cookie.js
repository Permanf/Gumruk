import cookie from 'js-cookie';

export const SetCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {expires: 7});
  }
};
export const GetCookie = (name) => {
  if (process.browser) {
    cookie.get(name);
  }
};
export const RemoveCookie = (name) => {
  cookie.remove(name)
};