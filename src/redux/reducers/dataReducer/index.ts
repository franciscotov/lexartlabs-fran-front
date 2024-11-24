import { dataTypes } from "../../ActionTypes/dataTypes";
import { DataActions, DataState, UserData } from "@/redux/types/types";

const initialState: DataState = {
  pending: false,
  data: {} as UserData,
  error: null,
};

const dataReducer = (state = initialState, action: DataActions) => {
  switch (action.type) {
    case dataTypes.FETCH_LOGIN_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        data: {
          ...state.data,
          token: action.payload,
        },
      };
    case dataTypes.FETCH_LOGIN_USER_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
