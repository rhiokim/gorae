import docker from '../api/api';

export const REQUEST_REMOVE_IMAGE = 'REQUEST_REMOVE_IMAGE';
export const SUCCESS_REMOVE_IMAGE = 'SUCCESS_REMOVE_IMAGE';
export const FAIL_REMOVE_IMAGE = 'FAIL_REMOVE_IMAGE';

/**
 * Remove Node
 */
const requestRemoveImage = () => {
  return {
    type: REQUEST_REMOVE_IMAGE
  };
};

const successRemoveImage = (data) => {
  return {
    type: SUCCESS_REMOVE_IMAGE,
    images: data,
    receivedAt: Date.now()
  };
};

const faileRemoveImage = (error) => ({
  type: FAIL_REMOVE_IMAGE,
  error: error
});

export const removeImage = (name) => dispatch => {
  dispatch(requestRemoveImage());

  return docker.delete(`images/${name}`)
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(faileRemoveImage(data));
        return;
      }

      dispatch(successRemoveImage(data));
    })
    .catch(error => {
      const {data} = error.response;
      dispatch(faileRemoveImage(data));
    });
};
