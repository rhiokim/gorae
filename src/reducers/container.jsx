const initial = {
  isFetching: false,
  container: {},
  process: {
    Processes: [],
    Titles: []
  },
  stats: {},
  changes: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_CONTAINER':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_CONTAINER': {
      state = Object.assign({}, state, {
        isFetching: false,
        container: action.container
      });
      break;
    }
    case 'REQUEST_CONTAINER_PROCESS':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_CONTAINER_PROCESS': {
      state = Object.assign({}, state, {
        isFetching: false,
        process: action.process
      });
      break;
    }
    case 'REQUEST_CONTAINER_STATS':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_CONTAINER_STATS': {
      state = Object.assign({}, state, {
        isFetching: false,
        stats: action.stats
      });
      break;
    }
    case 'REQUEST_CONTAINER_CHANGES':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_CONTAINER_CHANGES': {
      state = Object.assign({}, state, {
        isFetching: false,
        changes: action.changes
      });
      break;
    }
    case 'REQUEST_CONTAINER_LOGS':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_CONTAINER_LOGS': {
      state = Object.assign({}, state, {
        isFetching: false,
        logs: action.logs
      });
      break;
    }
    case 'RECEIVE_REMOVE': {
      state = Object.assign({}, state, {
        isRemoved: true
      });
      break;
    }
    default:
      break;
  }

  return state;
};
