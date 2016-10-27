/* global __API__ */
import axios from 'axios';

export const REQUEST_SERVICES = 'REQUEST_SERVICES';
export const RECEIVE_SERVICES = 'RECEIVE_SERVICES';
export const RECEIVE_SERVICES_FAIL = 'RECEIVE_SERVICES_FAIL';

const api = axios.create({
  baseURL: __API__
});

const requestServices = () => {
  return {
    type: REQUEST_SERVICES
  };
};

const receiveServices = data => {
  return {
    type: RECEIVE_SERVICES,
    services: data,
    receivedAt: Date.now()
  };
};

const fetchServicesFail = () => ({
  type: RECEIVE_SERVICES_FAIL
});

export const fetchServices = () => dispatch => {
  dispatch(requestServices());

  return api.get('nodes')
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchServicesFail());
        return;
      }

      dispatch(receiveServices(data));
    });
};
