export default (state, action) => {
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
