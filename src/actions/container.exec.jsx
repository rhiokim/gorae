import docker from '../api/api';

export const REQUEST_EXEC_CONTAINER = 'REQUEST_EXEC_CONTAINER';
export const SUCCESS_EXEC_CONTAINER = 'SUCCESS_EXEC_CONTAINER';
export const FAIL_EXEC_CONTAINER = 'FAIL_EXEC_CONTAINER';

/**
 * Remove Node
 */
const requestExecContainer = () => {
  return {
    type: REQUEST_EXEC_CONTAINER
  };
};

const successExecContainer = (data) => {
  return {
    type: SUCCESS_EXEC_CONTAINER,
    exec: data,
    receivedAt: Date.now()
  };
};

const faileExecContainer = (error) => ({
  type: FAIL_EXEC_CONTAINER,
  error: error
});

const initialData = {
  "AttachStdin": true,
  "AttachStdout": true,
  "AttachStderr": true,
  "Cmd": ["sh"],
  "DetachKeys": "ctrl-p,ctrl-q",
  "Privileged": true,
  "Tty": true,
  "User": ""
};

export const execContainer = (id, data = {}) => dispatch => {
  dispatch(requestExecContainer());

  data = Object.assign(initialData, data);

  return docker.post(`containers/${id}/exec`, data)
    .then(response => {
      const {status, data} = response;

      if (status !== 201) {
        dispatch(faileExecContainer(data));
        return;
      }

      dispatch(successExecContainer(data));
    })
    .catch(error => {
      const {data} = error.response;
      dispatch(faileExecContainer(data));
    });
};
