const initial = {
  forms: {}
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'UPDATE_MOUNTS':
      state = Object.assign({}, state, {
        forms: {...state.forms, type: action.type, Mounts: action.data}
      });
      break;
    case 'UPDATE_ENVIRONMENT':
      state = Object.assign({}, state, {
        forms: {...state.forms, type: action.type, Env: action.data}
      });
      break;
    default:
      break;
  }

  return state;
};
