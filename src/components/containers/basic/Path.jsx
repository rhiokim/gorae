import React from 'react';

export const Path = (props) => {
  const {container} = props;
  return (
    <fieldset className="content-group mt-30">
      <legend className="text-bold">PATH</legend>
      <table className="table table-framed">
        <thead>
          <tr>
            <th width="160">#</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hostname path</td>
            <td>{container.HostnamePath}</td>
          </tr>
          <tr>
            <td>Hosts path</td>
            <td>{container.HostsPath}</td>
          </tr>
          <tr>
            <td>Log path</td>
            <td>{container.LogPath}</td>
          </tr>
          <tr>
            <td>ResolvConf path</td>
            <td>{container.ResolvConfPath}</td>
          </tr>
        </tbody>
      </table>
    </fieldset>
    );
};
