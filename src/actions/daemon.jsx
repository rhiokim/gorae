/* global __API__ */
import axios from 'axios';

export const REQUEST_INFO = 'REQUEST_INFO';
export const RECEIVE_INFO = 'RECEIVE_INFO';
export const RECEIVE_INFO_FAIL = 'RECEIVE_INFO_FAIL';

export const REQUEST_VERSION = 'REQUEST_VERSION';
export const RECEIVE_VERSION = 'RECEIVE_VERSION';
export const RECEIVE_VERSION_FAIL = 'RECEIVE_VERSION_FAIL';

const api = axios.create({
  baseURL: __API__
});

const requestInfo = () => {
  return {
    type: REQUEST_INFO
  };
};

const receiveInfo = data => {
  return {
    type: RECEIVE_INFO,
    info: data,
    receivedAt: Date.now()
  };
};

const fetchInfoFail = () => ({
  type: RECEIVE_INFO_FAIL
});

const requestVersion = () => {
  return {
    type: REQUEST_VERSION
  };
};

const receiveVersion = data => {
  return {
    type: RECEIVE_VERSION,
    version: data,
    receivedAt: Date.now()
  };
};

const fetchVersionFail = () => ({
  type: RECEIVE_VERSION_FAIL
});

export const fetchInfo = () => dispatch => {
  dispatch(requestInfo());

  return api.get(`info`)
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchInfoFail());
        return;
      }

      dispatch(receiveInfo(data));
    });
};

export const fetchVersion = () => dispatch => {
  dispatch(requestVersion());

  return api.get(`version`)
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchVersionFail());
        return;
      }

      dispatch(receiveVersion(data));
    });
};
