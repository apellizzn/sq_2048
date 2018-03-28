export default function main(state = {}, action) {
  let nextState = { ...state };
  switch (action.type) {
    case "LOGIN_SUCCEEDED":
      nextState = { ...nextState, user: action.payload };
      break;
    default:
      break;
  }
  return nextState;
}
