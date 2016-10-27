const initial = {
  isFetching: false,
  services: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_SERVICES':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_SERVICES':
      state = Object.assign({}, state, {
        isFetching: false,
        services: action.services
      });
      break;
    default:
      break;
  }

  return state;
};
