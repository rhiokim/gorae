const initial = {
  isFetching: false,
  daemon: null,
  version: null
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_INFO':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_INFO':
      state = Object.assign({}, state, {
        isFetching: false,
        daemon: action.info
      });
      break;
    case 'REQUEST_VERSION':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_VERSION':
      state = Object.assign({}, state, {
        isFetching: false,
        version: action.version
      });
      break;
    default:
      break;
  }

  return state;
};
