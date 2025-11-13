import { Status } from "@/constants";
import { productTypes } from "@/redux/ActionTypes/productTypes";
import { ProductActions, ProductState } from "@/redux/types/types";

const initialState: ProductState = {
  pending: false,
  products: [],
  lastProductWasCreated: false,
  error: null,
  status: Status.IDLE,
};

const productsReducer = (state = initialState, action: ProductActions) => {
  switch (action.type) {
    case productTypes.FETCH_CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        lastProductWasCreated: false,
        status: Status.ERROR,
      };
    case productTypes.FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        status: Status.LOADING,
      };
    case productTypes.FETCH_CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        lastProductWasCreated: action.payload,
        status: Status.SUCCESS,
      };
    case productTypes.FETCH_GET_PRODUCT_LIST:
      return {
        ...state,
        status: Status.LOADING,
      };
    case productTypes.GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload,
        status: Status.SUCCESS,
      };
    case productTypes.GET_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        status: Status.ERROR,
      };
    default:
      return state;
  }
};

export default productsReducer;
