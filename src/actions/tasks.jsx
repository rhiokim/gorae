/* global __API__ */
import axios from 'axios';

export const REQUEST_TASKS = 'REQUEST_TASKS';
export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const RECEIVE_TASKS_FAIL = 'RECEIVE_TASKS_FAIL';

const api = axios.create({
  baseURL: __API__
});

const requestTasks = () => {
  return {
    type: REQUEST_TASKS
  };
};

const receiveTasks = data => {
  return {
    type: RECEIVE_TASKS,
    tasks: data,
    receivedAt: Date.now()
  };
};

const fetchTasksFail = () => ({
  type: RECEIVE_TASKS_FAIL
});

export const fetchTasks = () => dispatch => {
  dispatch(requestTasks());

  return api.get('tasks')
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchTasksFail());
        return;
      }

      dispatch(receiveTasks(data));
    });
};
