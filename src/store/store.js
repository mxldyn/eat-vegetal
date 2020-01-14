import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { navigationMiddleware } from '../navigation';
import rootSaga from '../sagas';
import rootReducer from '../reducers';

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware, navigationMiddleware);
  const store = createStore(rootReducer, middleware);

  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
