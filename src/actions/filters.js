export const CLEAN_FILTER = "CLEAN_FILTER";
export const FILTER_USERS = "FILTER_USERS";

export const clearFilter = (dispatch, getState) => {
  dispatch({ type: CLEAN_FILTER });
};

export const applyFilters = (fruit) => (dispatch, getState) => {
  dispatch({ type: FILTER_USERS, payload: fruit });
};
