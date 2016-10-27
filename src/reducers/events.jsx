const initial = {
  isFetching: false,
  filter: 'CONTAINER',
  events: [],
  event: {}
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'FILTER_EVENTS_TYPE': {
      state = Object.assign({}, state, {
        filter: action.filter
      });
      break;
    }
    case 'REQUEST_EVENTS': {
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    }
    case 'RECEIVE_EVENTS': {
      state = Object.assign({}, state, {
        isFetching: false,
        events: action.events.reverse()
      });
      break;
    }
    case 'REQUEST_EVENT_STREAM':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_EVENT_STREAM': {
      state = Object.assign({}, state, {
        isFetching: false,
        event: action.event
      });
      break;
    }
    case 'RECEIVE_EVENT_STREAM_FAIL':
      console.log(action);
      break;
    default:
      break;
  }

  return state;
};
