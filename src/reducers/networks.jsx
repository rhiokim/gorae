const initial = {
  isFetching: false,
  networks: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_NETWORKS':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_NETWORKS':
      state = Object.assign({}, state, {
        isFetching: false,
        networks: action.networks
      });
      break;
    default:
      break;
  }

  return state;
};
