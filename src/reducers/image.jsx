const initial = {
  isFetching: false,
  image: {}
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_IMAGE':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_IMAGE':
      state = Object.assign({}, state, {
        isFetching: false,
        image: action.image
      });
      break;
    default:
      break;
  }

  return state;
};
