const initial = {
  isFetching: false,
  image: {}
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_IMAGE':
    case 'REQUEST_CREATE_IMAGE':
      state = Object.assign({}, state, {
        pull: null
      });
      break;
    case 'RECEIVE_IMAGE':
      state = Object.assign({}, state, {
        isFetching: false,
        image: action.image
      });
      break;
    case 'SUCCESS_CREATE_IMAGE':
      state = Object.assign({}, state, {
        pull: action.pull
      })
      break;
    default:
      break;
  }

  return state;
};
