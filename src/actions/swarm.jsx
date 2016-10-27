/* global __API__ */
import axios from 'axios';

export const REQUEST_TASKS = 'REQUEST_TASKS';
export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const RECEIVE_TASKS_FAIL = 'RECEIVE_TASKS_FAIL';

export const REQUEST_SERVICES = 'REQUEST_SERVICES';
export const RECEIVE_SERVICES = 'RECEIVE_SERVICES';
export const RECEIVE_SERVICES_FAIL = 'RECEIVE_SERVICES_FAIL';

export const REQUEST_NODES = 'REQUEST_NODES';
export const RECEIVE_NODES = 'RECEIVE_NODES';
export const RECEIVE_NODES_FAIL = 'RECEIVE_NODES_FAIL';

export const REQUEST_SWARM = 'REQUEST_SWARM';
export const RECEIVE_SWARM = 'RECEIVE_SWARM';
export const RECEIVE_SWARM_FAIL = 'RECEIVE_SWARM_FAIL';

const api = axios.create({
  baseURL: __API__
});

/**
 * SERVICES
 */
const requestNodes = () => {
  return {
    type: REQUEST_NODES
  };
};

const receiveNodes = (nodes, tasks) => {
  return {
    type: RECEIVE_NODES,
    nodes: nodes,
    tasks: tasks,
    receivedAt: Date.now()
  };
};

const fetchNodesFail = () => ({
  type: RECEIVE_NODES_FAIL
});

export const fetchNodes = () => dispatch => {
  dispatch(requestNodes());

  return api.get('nodes')
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchNodesFail());
        return;
      }

      dispatch(receiveNodes(data));
    });
};

/**
 * SERVICES
 */
const requestServices = () => {
  return {
    type: REQUEST_SERVICES
  };
};

const receiveServices = data => {
  return {
    type: RECEIVE_SERVICES,
    services: data,
    receivedAt: Date.now()
  };
};

const fetchServicesFail = () => ({
  type: RECEIVE_SERVICES_FAIL
});

export const fetchServices = () => dispatch => {
  dispatch(requestServices());

  return api.get('nodes')
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchServicesFail());
        return;
      }

      dispatch(receiveServices(data));
    });
};

/**
 * TASKS
 */
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

/**
 * SWARM
 */
// const requestSwarm = () => {
//   return {
//     type: REQUEST_SWARM
//   };
// };

// const receiveSwarm = (nodes, tasks) => {
//   return {
//     type: RECEIVE_SWARM,
//     nodes: nodes,
//     tasks: tasks,
//     receivedAt: Date.now()
//   };
// };

// const fetchSwarmFail = () => ({
//   type: RECEIVE_SWARM_FAIL
// });

export const fetchSwarm = () => dispatch => {
  Promise.all([
    api.get('nodes'),
    api.get('tasks')
  ]).then(result => {
    const nodes = result[0].data;
    const tasks = result[1].data;

    dispatch(receiveNodes(nodes, tasks));
    dispatch(receiveTasks(tasks));
    // receiveSwarm()
  });
};
