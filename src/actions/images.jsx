/* global __API__ */
import axios from 'axios';

export const REQUEST_IMAGES = 'REQUEST_IMAGES';
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export const RECEIVE_IMAGES_FAIL = 'RECEIVE_IMAGES_FAIL';

const api = axios.create({
  baseURL: __API__
});

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

export const fetchImages = params => dispatch => {
  dispatch(requestImages());

  return api.get('images/json', {
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
