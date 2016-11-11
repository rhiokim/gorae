import _ from 'lodash';

const initial = {
  isFetching: false,
  containers: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_CONTAINERS':
      state = Object.assign({}, state, {
        isFetching: true,
        filtered: null
      });
      break;
    case 'RECEIVE_CONTAINERS': {
      const {containers} = action;
      const lastOne = containers[containers.length - 1] || {};
      state = Object.assign({}, state, {
        isFetching: false,
        containers: [...state.containers, ...containers],
        last: lastOne.Id
      });
      break;
    }
    case 'FILTER_BY_NAME':
      const {name} = action;
      const {containers} = state;
      const res = name
        ? containers.filter(container => container.Names[0].indexOf(name) > -1)
        : state.containers ;
      return Object.assign({}, state, {
        filtered: res
      });
    default:
      break;
  }

  return state;
};
