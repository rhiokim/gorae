import React from 'react';

export const Network = props => {
  const {network} = props;
  const {Networks, Ports} = network;
  console.log(network, Networks)
  return (
    <fieldset className="content-group mt-30">
      <legend className="text-bold">NETWORK</legend>
      <table className="table table-framed">
        <thead>
          <tr>
            <th width="160">#</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ports</td>
            <td>
              {Ports && Object.keys(Ports).map(key => {
                const port = network.Ports[key];
                return <span key={key}>{port ? `${port[0].HostIp}:${port[0].HostPort}->` : ''}{key}</span>
              })}
            </td>
          </tr>
          <tr>
            <td>Gateway</td>
            <td>{network.Gateway}</td>
          </tr>
          {Object.keys(Networks).map(key => {
            const net = Networks[key];
            return <tr key={key}>
            <td>{key}</td>
            <td>
              <table className="table table-framed">
                <thead>
                  <tr>
                    <th width="120">#</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>IP Address</td>
                    <td>{net.IPAddress}</td>
                  </tr>
                  <tr>
                    <td>Mac Address</td>
                    <td>{net.MacAddress}</td>
                  </tr>
                  <tr>
                    <td>Network ID</td>
                    <td>{net.NetworkID}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          })}
        </tbody>
      </table>
    </fieldset>
    );
};
