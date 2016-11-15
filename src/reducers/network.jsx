const initial = {
  isFetching: false,
  network: null
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_NETWORK':
    case 'REQUEST_CREATE_NETWORK':
      state = Object.assign({}, state, {
        isFetching: true,
        create: null
      });
      break;
    case 'RECEIVE_NETWORK':
      state = Object.assign({}, state, {
        isFetching: false,
        network: action.network
      });
      break;
    case 'SUCCESS_CREATE_NETWORK':
      state = Object.assign({}, state, {
        create: action.create
      })
      break;
    default:
      break;
  }

  return state;
};
