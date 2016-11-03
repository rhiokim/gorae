/* global __API__ */
import docker from '../api/api';
// import axios from 'axios';

export const REQUEST_CONTAINER = 'REQUEST_CONTAINER';
export const RECEIVE_CONTAINER = 'RECEIVE_CONTAINER';
export const RECEIVE_CONTAINER_FAIL = 'RECEIVE_CONTAINER_FAIL';

export const REQUEST_CONTAINER_PROCESS = 'REQUEST_CONTAINER_PROCESS';
export const RECEIVE_CONTAINER_PROCESS = 'RECEIVE_CONTAINER_PROCESS';
export const RECEIVE_CONTAINER_PROCESS_FAIL = 'RECEIVE_CONTAINER_PROCESS_FAIL';

export const REQUEST_CONTAINER_STATS = 'REQUEST_CONTAINER_STATS';
export const RECEIVE_CONTAINER_STATS = 'RECEIVE_CONTAINER_STATS';
export const RECEIVE_CONTAINER_STATS_FAIL = 'RECEIVE_CONTAINER_STATS_FAIL';

export const REQUEST_CONTAINER_CHANGES = 'REQUEST_CONTAINER_CHANGES';
export const RECEIVE_CONTAINER_CHANGES = 'RECEIVE_CONTAINER_CHANGES';
export const RECEIVE_CONTAINER_CHANGES_FAIL = 'RECEIVE_CONTAINER_CHANGES_FAIL';

export const REQUEST_CONTAINER_LOGS = 'REQUEST_CONTAINER_LOGS';
export const RECEIVE_CONTAINER_LOGS = 'RECEIVE_CONTAINER_LOGS';
export const RECEIVE_CONTAINER_LOGS_FAIL = 'RECEIVE_CONTAINER_LOGS_FAIL';

export const REQUEST_COMMIT = 'REQUEST_COMMIT';
export const RECEIVE_COMMIT = 'RECEIVE_COMMIT';
export const RECEIVE_COMMIT_FAIL = 'RECEIVE_COMMIT_FAIL';

export const REQUEST_STOP = 'REQUEST_STOP';
export const RECEIVE_STOP = 'RECEIVE_STOP';
export const RECEIVE_STOP_FAIL = 'RECEIVE_STOP_FAIL';

export const REQUEST_RESTART = 'REQUEST_RESTART';
export const RECEIVE_RESTART = 'RECEIVE_RESTART';
export const RECEIVE_RESTART_FAIL = 'RECEIVE_RESTART_FAIL';

export const REQUEST_START = 'REQUEST_START';
export const RECEIVE_START = 'RECEIVE_START';
export const RECEIVE_START_FAIL = 'RECEIVE_START_FAIL';

export const REQUEST_KILL = 'REQUEST_KILL';
export const RECEIVE_KILL = 'RECEIVE_KILL';
export const RECEIVE_KILL_FAIL = 'RECEIVE_KILL_FAIL';

export const REQUEST_PAUSE = 'REQUEST_PAUSE';
export const RECEIVE_PAUSE = 'RECEIVE_PAUSE';
export const RECEIVE_PAUSE_FAIL = 'RECEIVE_PAUSE_FAIL';

export const REQUEST_UNPAUSE = 'REQUEST_UNPAUSE';
export const RECEIVE_UNPAUSE = 'RECEIVE_UNPAUSE';
export const RECEIVE_UNPAUSE_FAIL = 'RECEIVE_UNPAUSE_FAIL';

export const REQUEST_REMOVE = 'REQUEST_REMOVE';
export const RECEIVE_REMOVE = 'RECEIVE_REMOVE';
export const RECEIVE_REMOVE_FAIL = 'RECEIVE_REMOVE_FAIL';

// const api = axios.create({
//   baseURL: __API__
// });

const requestContainer = () => {
  return {
    type: REQUEST_CONTAINER
  };
};

const receiveContainer = data => {
  return {
    type: RECEIVE_CONTAINER,
    container: data,
    receivedAt: Date.now()
  };
};

const fetchContainerFail = () => ({
  type: RECEIVE_CONTAINER_FAIL
});

const requestContainerProcess = () => {
  return {
    type: REQUEST_CONTAINER_PROCESS
  };
};

const receiveContainerProcess = data => {
  return {
    type: RECEIVE_CONTAINER_PROCESS,
    process: data,
    receivedAt: Date.now()
  };
};

const fetchContainerProcessFail = () => ({
  type: RECEIVE_CONTAINER_PROCESS_FAIL
});

const requestContainerChanges = () => {
  return {
    type: REQUEST_CONTAINER_CHANGES
  };
};

const receiveContainerChanges = data => {
  return {
    type: RECEIVE_CONTAINER_CHANGES,
    changes: data,
    receivedAt: Date.now()
  };
};

const fetchContainerChangesFail = () => ({
  type: RECEIVE_CONTAINER_CHANGES_FAIL
});

const requestContainerStats = () => {
  return {
    type: REQUEST_CONTAINER_STATS
  };
};

const receiveContainerStats = data => {
  return {
    type: RECEIVE_CONTAINER_STATS,
    stats: data,
    receivedAt: Date.now()
  };
};

const fetchContainerStatsFail = () => ({
  type: RECEIVE_CONTAINER_STATS_FAIL
});

const requestContainerLogs = () => {
  return {
    type: REQUEST_CONTAINER_LOGS
  };
};

const receiveContainerLogs = data => {
  return {
    type: RECEIVE_CONTAINER_LOGS,
    logs: data,
    receivedAt: Date.now()
  };
};

const fetchContainerLogsFail = () => ({
  type: RECEIVE_CONTAINER_LOGS_FAIL
});

const requestCommits = () => {
  return {
    type: REQUEST_COMMIT
  };
};

const receiveCommits = data => {
  return {
    type: RECEIVE_COMMIT,
    commit: data,
    receivedAt: Date.now()
  };
};

const fetchCommitsFail = () => ({
  type: RECEIVE_COMMIT_FAIL
});

const requestStop = () => {
  return {
    type: REQUEST_STOP
  };
};

const receiveStop = () => {
  return {
    type: RECEIVE_STOP
  };
};

const fetchStopFail = () => ({
  type: RECEIVE_STOP_FAIL
});

const requestRestart = () => {
  return {
    type: REQUEST_RESTART
  };
};

const receiveRestart = () => {
  return {
    type: RECEIVE_RESTART
  };
};

const fetchRestartFail = () => ({
  type: RECEIVE_RESTART_FAIL
});

const requestStart = () => {
  return {
    type: REQUEST_START
  };
};

const receiveStart = () => {
  return {
    type: RECEIVE_START
  };
};

const fetchStartFail = () => ({
  type: RECEIVE_START_FAIL
});

const requestKill = () => {
  return {
    type: REQUEST_KILL
  };
};

const receiveKill = () => {
  return {
    type: RECEIVE_KILL
  };
};

const fetchKillFail = () => ({
  type: RECEIVE_KILL_FAIL
});

const requestPause = () => {
  return {
    type: REQUEST_PAUSE
  };
};

const receivePause = () => {
  return {
    type: RECEIVE_PAUSE
  };
};

const fetchPauseFail = () => ({
  type: RECEIVE_PAUSE_FAIL
});

const requestUnPause = () => {
  return {
    type: REQUEST_UNPAUSE
  };
};

const receiveUnPause = () => {
  return {
    type: RECEIVE_UNPAUSE
  };
};

const fetchUnPauseFail = () => ({
  type: RECEIVE_UNPAUSE_FAIL
});

const requestRemove = () => {
  return {
    type: REQUEST_REMOVE
  };
};

const receiveRemove = () => {
  return {
    type: RECEIVE_REMOVE
  };
};

const fetchRemoveFail = () => ({
  type: RECEIVE_REMOVE_FAIL
});

export const fetchContainer = (id, params = {}) => dispatch => {
  dispatch(requestContainer());

  return docker.get(`containers/${id}/json`, {
    params: params
  })
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchContainerFail());
        return;
      }

      dispatch(receiveContainer(data));
    });
};

export const fetchContainerProcess = (id, params = {}) => dispatch => {
  dispatch(requestContainerProcess());

  return docker.get(`containers/${id}/top`, {
    params: params
  })
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchContainerProcessFail());
        return;
      }

      dispatch(receiveContainerProcess(data));
    });
};

export const fetchContainerLogs = (id, params = {}) => dispatch => {
  dispatch(requestContainerLogs());

  return docker.get(`containers/${id}/logs`, {
    params: params
  })
    .then(response => {
      const {status} = response;
      let {data} = response;

      if (status !== 200) {
        dispatch(fetchContainerLogsFail());
        return;
      }

      data = data.replace(/[\r]/g, '\n');
      // Strip 8 byte header from each line of output
      data = data.substring(8);
      data = data.replace(/\n(.{8})/g, '\n');

      dispatch(receiveContainerLogs(data));
    });
};

export const fetchContainerChanges = id => dispatch => {
  dispatch(requestContainerChanges());

  return docker.get(`containers/${id}/changes`)
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchContainerChangesFail());
        return;
      }

      dispatch(receiveContainerChanges(data));
    });
};

export const fetchContainerStats = (id, params) => dispatch => {
  dispatch(requestContainerStats());

  return docker.get(`containers/${id}/stats`, {
    params: params
  })
    .then(response => {
      const {status, data} = response;

      if (status !== 200) {
        dispatch(fetchContainerStatsFail());
        return;
      }

      dispatch(receiveContainerStats(data));
    });
};

export const fetchCommits = (data, params) => dispatch => {
  dispatch(requestCommits());

  return docker.post('commit', data, {
    params: params
  })
    .then(response => {
      const {status, data} = response;

      if (status !== 201) {
        dispatch(fetchCommitsFail());
        return;
      }

      dispatch(receiveCommits(data));
    });
};

export const stopContainer = (id, params = {t: 5}) => dispatch => {
  dispatch(requestStop());

  return docker.post(`containers/${id}/stop`, {id: id}, {params: params})
    .then(response => {
      const {status, data} = response;

      if (status !== 204) {
        dispatch(fetchStopFail());
        return;
      }

      dispatch(receiveStop(data));
    });
};

export const restartContainer = (id, params = {t: 5}) => dispatch => {
  dispatch(requestRestart());

  return docker.post(`containers/${id}/restart`, {id: id}, {params: params})
    .then(response => {
      const {status, data} = response;

      if (status !== 204) {
        dispatch(fetchRestartFail());
        return;
      }

      dispatch(receiveRestart(data));
    });
};

export const startContainer = (id, data) => dispatch => {
  dispatch(requestStart());

  return docker.post(`containers/${id}/start`, data)
    .then(response => {
      const {status, data} = response;

      if (status !== 204) {
        dispatch(fetchStartFail());
        return;
      }

      dispatch(receiveStart(data));
    });
};

export const killContainer = id => dispatch => {
  dispatch(requestKill());

  return docker.post(`containers/${id}/kill`)
    .then(response => {
      const {status, data} = response;

      if (status !== 204) {
        dispatch(fetchKillFail());
        return;
      }

      dispatch(receiveKill(data));
    });
};

export const pauseContainer = id => dispatch => {
  dispatch(requestPause());

  return docker.post(`containers/${id}/pause`)
    .then(response => {
      const {status, data} = response;

      if (status !== 204) {
        dispatch(fetchPauseFail());
        return;
      }

      dispatch(receivePause(data));
    });
};

export const unPauseContainer = id => dispatch => {
  dispatch(requestUnPause());

  return docker.post(`containers/${id}/unpause`)
    .then(response => {
      const {status, data} = response;

      if (status !== 204) {
        dispatch(fetchUnPauseFail());
        return;
      }

      dispatch(receiveUnPause(data));
    });
};

export const removeContainer = (id, params = {v: 1, force: true}) => dispatch => {
  dispatch(requestRemove());

  return docker.delete(`containers/${id}`, {}, {params: params})
    .then(response => {
      const {status, data} = response;

      if (status !== 204) {
        dispatch(fetchRemoveFail());
        return;
      }

      dispatch(receiveRemove(data));
    });
};
