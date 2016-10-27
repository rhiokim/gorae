/* global __API__ */
import axios from 'axios';

export const REQUEST_NETWORKS = 'REQUEST_NETWORKS';
export const RECEIVE_NETWORKS = 'RECEIVE_NETWORKS';
export const RECEIVE_NETWORKS_FAIL = 'RECEIVE_NETWORKS_FAIL';

const api = axios.create({
  baseURL: __API__
});

const requestNetworks = () => {
  return {
    type: REQUEST_NETWORKS
  };
};

const receiveNetworks = data => {
  return {
    type: RECEIVE_NETWORKS,
    networks: data,
    receivedAt: Date.now()
  };
};

const fetchNetworksFail = () => ({
  type: RECEIVE_NETWORKS_FAIL
});

export const fetchNetworks = () => dispatch => {
  dispatch(requestNetworks());

  return api.get('networks')
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchNetworksFail());
        return;
      }

      dispatch(receiveNetworks(data));
    });
};
