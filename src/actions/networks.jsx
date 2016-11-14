/* global __API__ */
import docker from '../api/api';
// import axios from 'axios';

export const REQUEST_NETWORKS = 'REQUEST_NETWORKS';
export const RECEIVE_NETWORKS = 'RECEIVE_NETWORKS';
export const RECEIVE_NETWORKS_FAIL = 'RECEIVE_NETWORKS_FAIL';
export const NETWORK_FILTER_BY_NAME = 'NETWORK_FILTER_BY_NAME';

// const api = axios.create({
//   baseURL: __API__
// });

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

const _filterByName = name => ({
  type: NETWORK_FILTER_BY_NAME,
  name: name
})

export const filterByName = name => dispatch => {
  dispatch(_filterByName(name));
}

export const fetchNetworks = () => dispatch => {
  dispatch(requestNetworks());

  return docker.get('networks')
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchNetworksFail());
        return;
      }

      dispatch(receiveNetworks(data));
    });
};
