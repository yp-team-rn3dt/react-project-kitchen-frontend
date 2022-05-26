import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import reducer from './reducer';

export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(
      myRouterMiddleware,
      promiseMiddleware,
      localStorageMiddleware,
    );
  }
  // Enable additional logging in non-production environments.
  return applyMiddleware(
    myRouterMiddleware,
    promiseMiddleware,
    localStorageMiddleware,
    createLogger(),
  );
};

function configureStore(preloadedState) {
  const store = createStore(
    reducer(history),
    preloadedState,
    compose(getMiddleware()),
  );

  return store;
}

export const store = configureStore();
