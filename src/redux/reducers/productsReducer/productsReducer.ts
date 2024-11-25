import { productTypes } from "@/redux/ActionTypes/productTypes";
import { ProductActions, ProductState } from "../../types/types";

const initialState: ProductState = {
  pending: false,
  products: [],
  lastProductWasCreated: false,
  error: null,
};

const productsReducer = (state = initialState, action: ProductActions) => {
  switch (action.type) {
    case productTypes.FETCH_CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload,
        lastProductWasCreated: false,
      };
    case productTypes.FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case productTypes.FETCH_CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        pending: false,
        lastProductWasCreated: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
