const initial = {
  isFetching: false,
  volumes: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_VOLUMES':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_VOLUMES':
      state = Object.assign({}, state, {
        isFetching: false,
        volumes: action.volumes || [],
        warnings: action.warnings
      });
      break;
    case 'VOLUME_FILTER_BY_NAME':
      const {name} = action;
      const {volumes} = state;
      const res = name
        ? volumes.filter(volume => volume.Name.indexOf(name) > -1)
        : state.volumes ;
      return Object.assign({}, state, {
        filtered: res
      });
    default:
      break;
  }

  return state;
};
