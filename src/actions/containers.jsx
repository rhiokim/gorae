/* global __API__ */
import docker from '../api/api';
// import axios from 'axios';

export const REQUEST_CONTAINERS = 'REQUEST_CONTAINERS';
export const RECEIVE_CONTAINERS = 'RECEIVE_CONTAINERS';
export const RECEIVE_CONTAINERS_FAIL = 'RECEIVE_CONTAINERS_FAIL';

export const FILTER_BY_NAME = 'FILTER_BY_NAME';
// const api = axios.create({
//   baseURL: __API__
// });

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

const _filterByName = name => ({
  type: FILTER_BY_NAME,
  name: name
})

export const filterByName = name => dispatch => {
  dispatch(_filterByName(name));
}

export const fetchContainers = params => dispatch => {
  dispatch(requestContainers());

  return docker.get('containers/json', {
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
