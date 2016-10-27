const initial = {
  isFetching: false,
  tasks: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_TASKS':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_TASKS':
      state = Object.assign({}, state, {
        isFetching: false,
        tasks: action.tasks
      });
      break;
    default:
      break;
  }

  return state;
};
