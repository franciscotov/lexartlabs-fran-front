import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
// import logger from "redux-logger";
import { rootSaga } from "./sagas";
import rootReducer from "./reducers/rootReducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
