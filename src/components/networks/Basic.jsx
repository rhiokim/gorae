import React from 'react';
import {Link} from 'react-router';
import TimeAgo from 'react-timeago';
import dateFormat from 'dateformat';
import prettyBytes from 'pretty-bytes';

export const Basic = props => {
  const {IPAM, Options} = props;
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
            <td>Name</td>
            <td>{props.Name}</td>
          </tr>
          <tr>
            <td>Id</td>
            <td>{props.Id}</td>
          </tr>
          <tr>
            <td>Scope</td>
            <td>{props.Scope}</td>
          </tr>
          <tr>
            <td>Driver</td>
            <td>{props.Driver}</td>
          </tr>
          <tr>
            <td>IPAM</td>
            <td>

            {!IPAM && IPAM.Config
              ? ''
              : <table className="table table-framed">
                <tbody>
                  <tr>
                    <td>Driver</td>
                    <td>{props.IPAM.Driver}</td>
                  </tr>
                  <tr>
                    <td>Gateway</td><td>{IPAM.Config[0].Gateway}</td>
                  </tr>
                  <tr>
                    <td>Subnet</td><td>{IPAM.Config[0].Subnet}</td>
                  </tr>
                </tbody>
              </table>
              }
            </td>
          </tr>
          <tr>
            <td>Options</td>
            <td>

              <table className="table table-framed">
                <thead>
                  <tr>
                    <th width="400">Key</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                {Object.keys(Options).map((key, i) => {
                  return <tr key={key}>
                    <td>{key}</td>
                    <td>{Options[key]}</td>
                  </tr>
                })}
                </tbody>
              </table>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
