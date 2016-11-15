const initial = {
  isFetching: false,
  volume: null
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_VOLUME':
    case 'REQUEST_CREATE_VOLUME':
      state = Object.assign({}, state, {
        isFetching: true,
        create: null
      });
      break;
    case 'RECEIVE_VOLUME':
      state = Object.assign({}, state, {
        isFetching: false,
        volume: action.volume
      });
      break;
    case 'SUCCESS_CREATE_VOLUME':
      state = Object.assign({}, state, {
        create: action.create
      })
      break;
    default:
      break;
  }

  return state;
};
