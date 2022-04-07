export const ProfileReducer = (state, action) => {
  const {
    type,
    payload: { list, arrList },
  } = action;
  switch (type) {
    case "GET_PLAYLIST":
      return {
        ...state,
        list,
      };
    case "GET_ARR_LIST":
      return {
        ...state,
        arrList,
      };
    default:
      return state;
  }
};
