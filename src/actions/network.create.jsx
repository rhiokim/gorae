import docker from '../api/api';

export const REQUEST_CREATE_NETWORK = 'REQUEST_CREATE_NETWORK';
export const SUCCESS_CREATE_NETWORK = 'SUCCESS_CREATE_NETWORK';
export const FAIL_CREATE_NETWORK = 'FAIL_CREATE_NETWORK';

/**
 * Remove Node
 */
const requestCreateNetwork = () => {
  return {
    type: REQUEST_CREATE_NETWORK
  };
};

const successCreateNetwork = (data) => {
  return {
    type: SUCCESS_CREATE_NETWORK,
    create: data,
    receivedAt: Date.now()
  };
};

const faileCreateNetwork = (error) => ({
  type: FAIL_CREATE_NETWORK,
  error: error
});

export const createNetwork = (data) => dispatch => {
  dispatch(requestCreateNetwork());

  return docker.post(`networks/create`, data)
    .then(response => {
      const {status, data} = response;

      if (status !== 201) {
        dispatch(faileCreateNetwork(data));
        return;
      }

      dispatch(successCreateNetwork(data));
    })
    .catch(error => {
      const {data} = error.response;
      dispatch(faileCreateNetwork(data));
    });
};
