import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import {hashHistory} from 'react-router';
import {routerMiddleware, routerReducer as routing} from 'react-router-redux';
// import {persistState} from 'redux-devtools';
import createLogger from 'redux-logger';
import DevTools from '../DevTools';

import articleReducer from '../reducers/article';
import userReducer from '../reducers/user';
import imagesReducer from '../reducers/images';
import containersReducer from '../reducers/containers';
import containerReducer from '../reducers/container';
import imageReducer from '../reducers/image';
import imageHistoryReducer from '../reducers/history';
import networksReducer from '../reducers/networks';
import networkReducer from '../reducers/network';
import daemonReducer from '../reducers/daemon';
import volumesReducer from '../reducers/volumes';
import eventsReducer from '../reducers/events';
import nodesReducer from '../reducers/nodes';
import servicesReducer from '../reducers/services';
import tasksReducer from '../reducers/tasks';
import formReducer from '../reducers/form';

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

const rootReducer = combineReducers({
  articleReducer: articleReducer,
  userReducer: userReducer,
  imagesReducer: imagesReducer,
  containersReducer: containersReducer,
  containerReducer: containerReducer,
  imageReducer: imageReducer,
  imageHistoryReducer: imageHistoryReducer,
  networksReducer: networksReducer,
  networkReducer: networkReducer,
  daemonReducer: daemonReducer,
  volumesReducer: volumesReducer,
  eventsReducer: eventsReducer,
  nodesReducer: nodesReducer,
  servicesReducer: servicesReducer,
  tasksReducer: tasksReducer,
  formReducer: formReducer,
  routing: routing,
});

const enhancer = compose(
  applyMiddleware(thunk, router, logger),
  DevTools.instrument(),
  // persistState(
  //   window.location.href.match(/[?&]_k=([^&]+)\b/)
  // )
);

const configureStore = initialState => {
  return createStore(rootReducer, initialState, enhancer);
};

export default configureStore;
