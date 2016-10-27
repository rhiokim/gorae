/* global __API__ */
import axios from 'axios';

export const FILTER_EVENTS_TYPE = 'FILTER_EVENTS_TYPE';

export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const RECEIVE_EVENTS_FAIL = 'RECEIVE_EVENTS_FAIL';

export const REQUEST_EVENT_STREAM = 'REQUEST_EVENT_STREAM';
export const RECEIVE_EVENT_STREAM = 'RECEIVE_EVENT_STREAM';
export const RECEIVE_EVENT_STREAM_FAIL = 'RECEIVE_EVENT_STREAM_FAIL';

const api = axios.create({
  baseURL: __API__
});

const requestEventStream = () => {
  return {
    type: REQUEST_EVENT_STREAM
  };
};

const receiveEventStream = data => {
  return {
    type: RECEIVE_EVENT_STREAM,
    event: data,
    receivedAt: Date.now()
  };
};

const fetchEventStreamFail = e => ({
  type: RECEIVE_EVENT_STREAM_FAIL,
  e: e
});

const requestEvents = () => {
  return {
    type: REQUEST_EVENTS
  };
};

const receiveEvents = data => {
  return {
    type: RECEIVE_EVENTS,
    events: data,
    receivedAt: Date.now()
  };
};

const fetchEventsFail = e => ({
  type: RECEIVE_EVENTS_FAIL,
  e: e
});

export let evtSource;

export const connEventStream = () => dispatch => {
  if (evtSource === undefined) {
    evtSource = new EventSource(`${__API__}events`);

    evtSource.onopen = e => {
      dispatch(requestEventStream(e));
    };

    evtSource.onerror = e => {
      if (e.currentTarget.readyState === EventSource.CONNECTING) {
        evtSource = new EventSource(`${__API__}events`);
        return;
      }
      dispatch(fetchEventStreamFail(e));
    };

    evtSource.onmessage = e => {
      const evt = JSON.parse(e.data);

      dispatch(receiveEventStream(evt));
    };
  }

  return evtSource;
};

export const fetchEvents = params => dispatch => {
  dispatch(requestEvents());

  return api.get('events', {params: params})
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchEventsFail());
        return;
      }

      let res = data.replace(/\n/g, ',');

      res = res.substr(0, res.length - 1);
      res = JSON.parse('[' + res + ']');
      dispatch(receiveEvents(res));
    });
};

export const filter = type => dispatch => {
  dispatch({
    type: FILTER_EVENTS_TYPE,
    filter: type
  });
};
