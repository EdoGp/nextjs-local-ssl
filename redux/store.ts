import { useMemo } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from './rootReducer';

let store;

const initStore = (initialState) =>
  createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({ ...store.getState(), ...preloadedState });
    store = undefined;
  }

  if (typeof window === 'undefined') {
    return _store;
  }
  if (!store) {
    store = _store;
  }

  return _store;
};

export const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};
