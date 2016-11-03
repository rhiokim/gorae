/* global __API__ */
import docker from '../api/api';
// import axios from 'axios';

export const REQUEST_NODES = 'REQUEST_NODES';
export const RECEIVE_NODES = 'RECEIVE_NODES';
export const RECEIVE_NODES_FAIL = 'RECEIVE_NODES_FAIL';

// const api = axios.create({
//   baseURL: __API__
// });

const requestNodes = () => {
  return {
    type: REQUEST_NODES
  };
};

const receiveNodes = data => {
  return {
    type: RECEIVE_NODES,
    nodes: data,
    receivedAt: Date.now()
  };
};

const fetchNodesFail = () => ({
  type: RECEIVE_NODES_FAIL
});

export const fetchNodes = () => dispatch => {
  dispatch(requestNodes());

  return docker.get('nodes')
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchNodesFail());
        return;
      }

      dispatch(receiveNodes(data));
    });
};
