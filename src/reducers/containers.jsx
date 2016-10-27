const initial = {
  isFetching: false,
  containers: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_CONTAINERS':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_CONTAINERS': {
      const {containers} = action;
      const lastOne = containers[containers.length - 1];
      const before = lastOne === undefined ? undefined : lastOne.Id;
      state = Object.assign({}, state, {
        isFetching: false,
        containers: [...state.containers, ...containers],
        before: before
      });
      break;
    }
    default:
      break;
  }

  return state;
};
