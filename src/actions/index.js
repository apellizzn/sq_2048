const LOGIN_REQUESTED = "LOGIN_REQUESTED";
const login = () => ({ type: LOGIN_REQUESTED });
const navigateTo = screen => ({
  type: "Navigation",
  payload: { routeName: screen }
});
export { login, navigateTo, LOGIN_REQUESTED };
