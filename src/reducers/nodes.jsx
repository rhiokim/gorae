import _ from 'lodash';

const initial = {
  isFetching: false,
  nodes: [],
  tasks: []
};

const assignTasks = (nodes, tasks) => {
  tasks.filter(task => {
    return task.DesiredState === 'running';
  }).forEach(task => {
    const node = _.find(nodes, (node) => {
      return node.ID === task.NodeID;
    });

    if (node.Tasks) {
      node.Tasks.push(task);
    } else {
      node.Tasks = [task];
    }
  });
};

export default (state = initial, action) => {
  switch (action.type) {
    case 'REQUEST_NODES':
      state = Object.assign({}, state, {
        isFetching: true
      });
      break;
    case 'RECEIVE_NODES': {
      assignTasks(action.nodes, action.tasks);
      state = Object.assign({
        isFetching: false,
        nodes: action.nodes,
        tasks: action.tasks
      });
      break;
    }
    default:
      break;
  }

  return state;
};
