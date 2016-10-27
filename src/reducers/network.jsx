const initial = {
  isFetching: false,
  network: {}
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_NETWORK':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_NETWORK':
      state = Object.assign({}, state, {
        isFetching: false,
        network: action.network
      });
      break;
    default:
      break;
  }

  return state;
};
