/* global __API__ */
import docker from '../api/api';
// import axios from 'axios';

export const REQUEST_NETWORK = 'REQUEST_NETWORK';
export const RECEIVE_NETWORK = 'RECEIVE_NETWORK';
export const RECEIVE_NETWORK_FAIL = 'RECEIVE_NETWORK_FAIL';

// const api = axios.create({
//   baseURL: __API__
// });

const requestNetwork = () => {
  return {
    type: REQUEST_NETWORK
  };
};

const receiveNetwork = data => {
  return {
    type: RECEIVE_NETWORK,
    network: data,
    receivedAt: Date.now()
  };
};

const fetchNetworkFail = () => ({
  type: RECEIVE_NETWORK_FAIL
});

export const fetchNetwork = id => dispatch => {
  dispatch(requestNetwork());

  return docker.get(`networks/${id}`)
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchNetworkFail());
        return;
      }

      dispatch(receiveNetwork(data));
    });
};
