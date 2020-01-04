import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { compose } from 'redux';
import rootReducer from './reducers';
import rootSaga from './sagas';
// to persist state after refresh, as redux looses state on refresh
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PERSIST_KEY } from './constants';

// Config for the persistence
const persistConfig = {
    key: PERSIST_KEY,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// enhancing the devtool/debug ability
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// applying it on the Store
const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

const persistedStore = persistStore(store);

// then run the saga
sagaMiddleware.run(rootSaga);

// Creating Redux store
export default {
    store,
    persistedStore,
};
