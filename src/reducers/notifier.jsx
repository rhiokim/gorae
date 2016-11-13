const initial = {
  isFetching: false,
  error: {}
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'FAIL_REMOVE_IMAGE':
      state = Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
      break;
    default:
      break;
  }

  return state;
};
