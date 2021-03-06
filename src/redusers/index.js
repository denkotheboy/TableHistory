export default (state, action) => {
  if (action.type === "addTab") {
    return {
      ...state,
      [action.tab]: {
        tab: action.tab,
        scrollPosition: action.scrollPosition,
        page: action.page
      }
    };
  } else if (action.type === "changeActiveTab") {
    return { ...state, activeTab: action.activeTab };
  } else if (action.type === "barcode") {
    return { ...state, barcode: action.barcode };
  } else if (action.type === "search") {
    return {
      ...state,
      search: { select: action.search.select, input: action.search.input }
    };
  }
  return state;
};
