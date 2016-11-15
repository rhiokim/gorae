import React from 'react';
import {Link} from 'react-router';
import {Button} from 'react-mdl';

export const Relation = props => {
  const {Containers} = props;
  console.log(Containers)
  return (
    <div>
      {Object.keys(Containers).map((key, i) => {
        const container = Containers[key]
        return <table className="table table-framed table-xs mb-10" key={i}>
          <thead>
            <tr>
              <th width="160">#</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{container.Name}</td>
            </tr>
            <tr>
              <td>Id</td>
              <td>
                <Link to={`containers/${key}`}>{key}</Link>
              </td>
            </tr>
            <tr>
              <td>Endpoint ID</td>
              <td>{container.EndpointID}</td>
            </tr>
            <tr>
              <td>IPv4 Address</td>
              <td>{container.IPv4Address}</td>
            </tr>
            <tr>
              <td>Mac Address</td>
              <td>{container.MacAddress}</td>
            </tr>
            <tr>
              <td>IPv6 Address</td>
              <td>{container.IPv6Address}</td>
            </tr>
            <tr>
              <td></td>
              <td>
                <div className="pull-right">
                  <Button raised colored ripple>Disconnect from network</Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      })}
    </div>
  );
};
