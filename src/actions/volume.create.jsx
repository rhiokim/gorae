import docker from '../api/api';

export const REQUEST_CREATE_VOLUME = 'REQUEST_CREATE_VOLUME';
export const SUCCESS_CREATE_VOLUME = 'SUCCESS_CREATE_VOLUME';
export const FAIL_CREATE_VOLUME = 'FAIL_CREATE_VOLUME';

/**
 * Remove Node
 */
const requestCreateVolume = () => {
  return {
    type: REQUEST_CREATE_VOLUME
  };
};

const successCreateVolume = (data) => {
  return {
    type: SUCCESS_CREATE_VOLUME,
    create: data,
    receivedAt: Date.now()
  };
};

const faileCreateVolume = (error) => ({
  type: FAIL_CREATE_VOLUME,
  error: error
});

export const createVolume = (data) => dispatch => {
  dispatch(requestCreateVolume());

  return docker.post(`volumes/create`,data)
    .then(response => {
      const {status, data} = response;

      if (status !== 201) {
        dispatch(faileCreateVolume(data));
        return;
      }

      dispatch(successCreateVolume(data));
    })
    .catch(error => {
      const {data} = error.response;
      dispatch(faileCreateVolume(data));
    });
};
