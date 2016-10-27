const initial = {
  isFetching: false,
  images: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_IMAGES':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_IMAGES':
      state = Object.assign({}, state, {
        isFetching: false,
        images: action.images
      });
      break;
    default:
      break;
  }

  return state;
};
