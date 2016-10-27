/* global __API__ */
export const UPDATE_MOUNTS = 'UPDATE_MOUNTS';
export const UPDATE_ENVIRONMENT = 'UPDATE_ENVIRONMENT';

export const updateMounts = data => {
  return {
    type: UPDATE_MOUNTS,
    data: data
  };
};

export const updateEnv = data => {
  return {
    type: UPDATE_ENVIRONMENT,
    data: data
  };
};
