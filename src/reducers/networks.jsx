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
    case 'NETWORK_FILTER_BY_NAME':
      const {name} = action;
      const {networks} = state;
      const res = name
        ? networks.filter(network => network.Name.indexOf(name) > -1)
        : state.networks ;
      return Object.assign({}, state, {
        filtered: res
      });
    case 'SUCCESS_REMOVE_NETWORK':
      break;
    default:
      break;
  }

  return state;
};
