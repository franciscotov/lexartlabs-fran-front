import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
// import logger from "redux-logger";
import { rootSaga } from "./sagas";
import rootReducer, { RootState } from "./reducers/rootReducer";

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});


let persistor = persistStore(store)
export { persistor };

sagaMiddleware.run(rootSaga);
export default store;
