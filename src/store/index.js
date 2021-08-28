import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import reducePersisted from './modules/reduxPersist';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducePersisted(rootReducer),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export default store;
