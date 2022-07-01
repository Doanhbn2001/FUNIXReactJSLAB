import * as ActionType from "./ActionType";

export const Dishes = (
  state = { isLoading: true, errMess: null, dishes: [] },
  action
) => {
  switch (action.type) {
    case ActionType.ADD_DISHES:
      console.log("s1");
      console.log(action.payload);
      console.log(state);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: action.payload,
      };
    case ActionType.DISHES_LOADING:
      console.log("s2");
      return {
        ...state,
        isLoading: true,
        errMess: null,
        dishes: [],
      };
    case ActionType.DISHES_FAILED:
      console.log("s3");
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    default:
      return state;
  }
};
