import docker from '../api/api';

export const REQUEST_REMOVE_NETWORK = 'REQUEST_REMOVE_NETWORK';
export const SUCCESS_REMOVE_NETWORK = 'SUCCESS_REMOVE_NETWORK';
export const FAIL_REMOVE_NETWORK = 'FAIL_REMOVE_NETWORK';

/**
 * Remove Node
 */
const requestRemoveNetwork = () => {
  return {
    type: REQUEST_REMOVE_NETWORK
  };
};

const successRemoveNetwork = () => {
  return {
    type: SUCCESS_REMOVE_NETWORK,
    receivedAt: Date.now()
  };
};

const faileRemoveNetwork = (error) => ({
  type: FAIL_REMOVE_NETWORK,
  error: error
});

export const removeNetwork = (name, params = {}) => dispatch => {
  dispatch(requestRemoveNetwork());

  return docker.delete(`networks/${name}`)
    .then(response => {
      const {status, data} = response;

      if (status !== 204) {
        dispatch(faileRemoveNetwork(data));
        return;
      }

      dispatch(successRemoveNetwork());
    })
    .catch(error => {
      const {data} = error.response;
      dispatch(faileRemoveNetwork(data));
    });
};
