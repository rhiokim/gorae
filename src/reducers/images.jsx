const initial = {
  isFetching: false,
  images: []
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_IMAGES':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_IMAGES':
      state = Object.assign({}, state, {
        isFetching: false,
        images: action.images
      });
      break;
    case 'IMAGE_FILTER_BY_NAME':
      const {name} = action;
      const {images} = state;
      const res = name
        ? images.filter(image => image.RepoTags[0].indexOf(name) > -1)
        : state.images ;
      return Object.assign({}, state, {
        filtered: res
      });
    case 'SUCCESS_REMOVE_IMAGE':
        console.log(action.images)
      break;
    default:
      break;
  }

  return state;
};
