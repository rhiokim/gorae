import React from 'react';
import {Link} from 'react-router';
import TimeAgo from 'react-timeago';
import dateFormat from 'dateformat';
import prettyBytes from 'pretty-bytes';

export const Basic = props => {
  const repoTag = props.RepoTags ? props.RepoTags[0] : '';
  const createdAt = props.Created ? props.Created : new Date();
  const {Config} = props;
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
            <td>Tag</td>
            <td>{repoTag}</td>
          </tr>
          <tr>
            <td>Created</td>
            <td>
              <TimeAgo date={createdAt} /> <small className="text-muted">({dateFormat(props.Created, "dddd, mm dS, yyyy, h:MM:ss TT")})</small>
            </td>
          </tr>
          <tr>
            <td>Author</td>
            <td>{props.Author}</td>
          </tr>
          <tr>
            <td>Parent</td>
            <td>
              <Link to={`images/${props.Parent}`}>{props.Parent}</Link>
            </td>
          </tr>
          <tr>
            <td>Size <small>(virtual size)</small></td>
            <td>{prettyBytes(props.VirtualSize || 0)}</td>
          </tr>
          <tr>
            <td>Host Name</td>
            <td>
              {Config.Hostname}
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>
              {JSON.stringify(Config.Cmd)}
            </td>
          </tr>
          <tr>
            <td>Docker Engine</td>
            <td>
              {props.DockerVersion}
            </td>
          </tr>
          <tr>
            <td>Build with</td>
            <td>
              {props.Os} <small className="text-muted">({props.Architecture})</small>
            </td>
          </tr>
        </tbody>
      </table>

      {!Config.ExposedPorts
        ? ''
        : <fieldset className="content-group mt-30">
        <legend className="text-bold">Exposed Ports</legend>
        <table className="table table-framed">
          <tbody>
          {Object.keys(Config.ExposedPorts).map((port, i) => {
            return <tr key={i}>
              <td>{port}</td>
            </tr>
            })}
          </tbody>
        </table>
      </fieldset>
      }

      {!Config.Env
        ? ''
        : <fieldset className="content-group mt-30">
        <legend className="text-bold">Environment Variables</legend>
        <table className="table table-framed">
          <thead>
            <tr>
              <th width="160">Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
          {Config.Env.map((env, i) => {
            env = env.split('=');
            return <tr key={env[0]}>
              <td>{env[0]}</td>
              <td>{env[1]}</td>
            </tr>
            })}
          </tbody>
        </table>
      </fieldset>
      }
    </div>
  );
};
