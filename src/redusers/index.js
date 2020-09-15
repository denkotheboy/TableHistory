export default (state, action) => {
  console.log(state);
  if (action.type === "addTab") {
    return {
      ...state,
      [action.tab]: {
        tab: action.tab,
        scrollPosition: action.scrollPosition
      }
    };
  }
  return state;
};
