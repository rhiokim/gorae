/* global __API__ */
import docker from '../api/api';
// import axios from 'axios';

export const REQUEST_IMAGE = 'REQUEST_IMAGE';
export const RECEIVE_IMAGE = 'RECEIVE_IMAGE';
export const RECEIVE_IMAGE_FAIL = 'RECEIVE_IMAGE_FAIL';

export const REQUEST_IMAGE_HISTORY = 'REQUEST_IMAGE_HISTORY';
export const RECEIVE_IMAGE_HISTORY = 'RECEIVE_IMAGE_HISTORY';
export const RECEIVE_IMAGE_HISTORY_FAIL = 'RECEIVE_IMAGE_HISTORY_FAIL';

// const api = axios.create({
//   baseURL: __API__
// });

const requestImage = () => {
  return {
    type: REQUEST_IMAGE
  };
};

const receiveImage = data => {
  return {
    type: RECEIVE_IMAGE,
    image: data,
    receivedAt: Date.now()
  };
};

const fetchImageFail = () => ({
  type: RECEIVE_IMAGE_FAIL
});

export const fetchImage = id => dispatch => {
  dispatch(requestImage());

  return docker.get(`images/${id}/json`)
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchImageFail());
        return;
      }

      dispatch(receiveImage(data));
    });
};

const requestImageHistory = () => {
  return {
    type: REQUEST_IMAGE_HISTORY
  };
};

const receiveImageHistory = data => {
  return {
    type: RECEIVE_IMAGE_HISTORY,
    history: data,
    receivedAt: Date.now()
  };
};

const fetchImageHistoryFail = () => ({
  type: RECEIVE_IMAGE_HISTORY_FAIL
});

export const fetchImageHistory = id => dispatch => {
  dispatch(requestImageHistory());

  return docker.get(`images/${id}/history`)
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchImageHistoryFail());
        return;
      }

      dispatch(receiveImageHistory(data));
    });
};
