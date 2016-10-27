const initial = {
  isFetching: false,
  volumes: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_VOLUMES':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_VOLUMES':
      state = Object.assign({}, state, {
        isFetching: false,
        volumes: action.volumes,
        warnings: action.warnings
      });
      break;
    default:
      break;
  }

  return state;
};
