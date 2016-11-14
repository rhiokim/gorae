import docker from '../api/api';

export const REQUEST_CREATE_IMAGE = 'REQUEST_CREATE_IMAGE';
export const SUCCESS_CREATE_IMAGE = 'SUCCESS_CREATE_IMAGE';
export const FAIL_CREATE_IMAGE = 'FAIL_CREATE_IMAGE';

/**
 * Remove Node
 */
const requestCreateImage = () => {
  return {
    type: REQUEST_CREATE_IMAGE
  };
};

const successCreateImage = (data) => {
  return {
    type: SUCCESS_CREATE_IMAGE,
    pull: data,
    receivedAt: Date.now()
  };
};

const faileCreateImage = (error) => ({
  type: FAIL_CREATE_IMAGE,
  error: error
});

export const createImage = ({registry, fromImage, tag}) => dispatch => {
  dispatch(requestCreateImage());

  registry = registry ? `${registry}/` : ''
  return docker.post(`images/create?fromImage=${registry}${fromImage}&tag=${tag}`)
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(faileCreateImage(data));
        return;
      }

      dispatch(successCreateImage(data));
    })
    .catch(error => {
      const {data} = error.response;
      dispatch(faileCreateImage(data));
    });
};
