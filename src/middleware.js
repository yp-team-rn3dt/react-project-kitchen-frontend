import agent from './agent';
import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  REGISTER,
} from './constants/actionTypes';

function isPromise(v) {
  return v && typeof v.then === 'function';
}

const promiseMiddleware = (store) => (next) => (action) => {
  const newAction = { ...action };
  if (isPromise(newAction.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: newAction.type });

    const currentView = store.getState().viewChangeCounter;
    const { skipTracking } = newAction;

    newAction.payload.then(
      (res) => {
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        console.log('RESULT', res);
        newAction.payload = res;
        store.dispatch({ type: ASYNC_END, promise: newAction.payload });
        store.dispatch(newAction);
      },
      (error) => {
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        console.log('ERROR', error);
        newAction.error = true;
        newAction.payload = error.response.body;
        if (!newAction.skipTracking) {
          store.dispatch({
            type: ASYNC_END,
            promise: newAction.payload,
          });
        }
        store.dispatch(newAction);
      },
    );

    return;
  }

  next(newAction);
};

const localStorageMiddleware = () => (next) => (action) => {
  if (action.type === REGISTER || action.type === LOGIN) {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.user.token);
      agent.setToken(action.payload.user.token);
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('jwt', '');
    agent.setToken(null);
  }

  next(action);
};

export { promiseMiddleware, localStorageMiddleware };
