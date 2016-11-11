/* global __API__ */
import docker from '../api/api';
// import axios from 'axios';

export const REQUEST_IMAGES = 'REQUEST_IMAGES';
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export const RECEIVE_IMAGES_FAIL = 'RECEIVE_IMAGES_FAIL';

export const IMAGE_FILTER_BY_NAME = 'IMAGE_FILTER_BY_NAME';

// const api = axios.create({
//   baseURL: __API__
// });

const requestImages = () => {
  return {
    type: REQUEST_IMAGES
  };
};

const receiveImages = data => {
  return {
    type: RECEIVE_IMAGES,
    images: data,
    receivedAt: Date.now()
  };
};

const fetchImagesFail = () => ({
  type: RECEIVE_IMAGES_FAIL
});

const _filterByName = name => ({
  type: IMAGE_FILTER_BY_NAME,
  name: name
})

export const filterByName = name => dispatch => {
  dispatch(_filterByName(name));
}

export const fetchImages = params => dispatch => {
  dispatch(requestImages());

  return docker.get('images/json', {
    params: params
  })
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchImagesFail());
        return;
      }

      dispatch(receiveImages(data));
    });
};
