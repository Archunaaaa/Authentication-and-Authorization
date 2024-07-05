import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import signupReducer from '../Auth/AuthSlice';
import rootSaga from '../Auth/AuthSagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(signupReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
