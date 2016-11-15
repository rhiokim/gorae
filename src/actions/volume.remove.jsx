import docker from '../api/api';

export const REQUEST_REMOVE_VOLUME = 'REQUEST_REMOVE_VOLUME';
export const SUCCESS_REMOVE_VOLUME = 'SUCCESS_REMOVE_VOLUME';
export const FAIL_REMOVE_VOLUME = 'FAIL_REMOVE_VOLUME';

/**
 * Remove Node
 */
const requestRemoveVolume = () => {
  return {
    type: REQUEST_REMOVE_VOLUME
  };
};

const successRemoveVolume = () => {
  return {
    type: SUCCESS_REMOVE_VOLUME,
    receivedAt: Date.now()
  };
};

const faileRemoveVolume = (error) => ({
  type: FAIL_REMOVE_VOLUME,
  error: error
});

export const removeVolume = (name) => dispatch => {
  dispatch(requestRemoveVolume());

  return docker.delete(`volumes/${name}`)
    .then(response => {
      const {status, data} = response;

      if (status !== 204) {
        dispatch(faileRemoveVolume(data));
        return;
      }

      dispatch(successRemoveVolume());
    })
    .catch(error => {
      const {data} = error.response;
      dispatch(faileRemoveVolume(data));
    });
};
