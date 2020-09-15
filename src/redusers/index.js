export default (state, action) => {
  console.log(state, action);
  if (action.type === "editTab") {
    return { ...state, auth: action.auth };
  } else if (action.type === "addTab") {
    return {
      ...state,
      images: { [action.src]: { className: action.className } }
    };
  }
  return state;
};
