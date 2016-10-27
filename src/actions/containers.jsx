/* global __API__ */
import axios from 'axios';

export const REQUEST_CONTAINERS = 'REQUEST_CONTAINERS';
export const RECEIVE_CONTAINERS = 'RECEIVE_CONTAINERS';
export const RECEIVE_CONTAINERS_FAIL = 'RECEIVE_CONTAINERS_FAIL';

const api = axios.create({
  baseURL: __API__
});

const requestContainers = () => {
  return {
    type: REQUEST_CONTAINERS
  };
};

const receiveContainers = data => {
  return {
    type: RECEIVE_CONTAINERS,
    containers: data,
    receivedAt: Date.now()
  };
};

const fetchContainersFail = () => ({
  type: RECEIVE_CONTAINERS_FAIL
});

export const fetchContainers = params => dispatch => {
  dispatch(requestContainers());

  return api.get('containers/json', {
    params: params
  })
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchContainersFail());
        return;
      }

      dispatch(receiveContainers(data));
    });
};
