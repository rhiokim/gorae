import React from 'react';
import TimeAgo from 'react-timeago';
import dateFormat from 'dateformat';

export const Version = props => {
  const buildTime = props.BuildTime ? new Date(props.BuildTime).toISOString() : new Date();
  return (
    <div>
      <table className="table table-framed">
        <thead>
          <tr>
            <th width="160">#</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Docker Version</td>
            <td>{props.Version}</td>
          </tr>
          <tr>
            <td>API Version</td>
            <td>
              <a href={`https://docs.docker.com/engine/reference/api/docker_remote_api_v${props.ApiVersion}`} target="_blank">{props.ApiVersion}</a>
            </td>
          </tr>
          <tr>
            <td>Go Version</td>
            <td>{props.GoVersion}</td>
          </tr>
          <tr>
            <td>Latest Commit</td>
            <td>{props.GitCommit}</td>
          </tr>
          <tr>
            <td>Latest Build Time</td>
            <td><TimeAgo date={buildTime} /> <small className="text-muted">({dateFormat(props.BuildTime, "dddd, mm dS, yyyy, h:MM:ss TT")})</small></td>
          </tr>
          <tr>
            <td>Driver</td>
            <td>
              {props.Os}<sup className="text-muted">os</sup> - {props.Arch}<sup className="text-muted">architecture</sup> - {props.KernelVersion}<sup className="text-muted">kernel</sup>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
