const initial = {
  isFetching: false,
  histories: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_IMAGE_HISTORY':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_IMAGE_HISTORY':
      state = Object.assign({}, state, {
        isFetching: false,
        histories: action.history
      });
      break;
    default:
      break;
  }

  return state;
};
