import { combineReducers } from "redux";
import productsReducer from "./productsReducer/productsReducer";
import dataReducer from "./dataReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  data: dataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
