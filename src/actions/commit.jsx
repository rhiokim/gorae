import docker from '../api/api';

export const REQUEST_COMMIT = 'REQUEST_COMMIT';
export const SUCCESS_COMMIT = 'RECEIVE_COMMIT';
export const FAIL_COMMIT = 'FAIL_COMMIT';

const requestCommits = () => {
  return {
    type: REQUEST_COMMIT
  };
};

const receiveCommits = data => {
  return {
    type: SUCCESS_COMMIT,
    commit: data,
    receivedAt: Date.now()
  };
};

const fetchCommitsFail = () => ({
  type: FAIL_COMMIT
});

export const commit = ({id, comment, repo, tag, config}) => dispatch => {
  dispatch(requestCommits());

  return docker.post(`commit?container=${id}&tag=${tag}`, {params: {repo:1}}, config)
    .then(response => {
      const {status, data} = response;

      if (status !== 201) {
        dispatch(fetchCommitsFail());
        return;
      }

      dispatch(receiveCommits(data));
    });
};
