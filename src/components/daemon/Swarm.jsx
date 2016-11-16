import React from 'react';
import formatToHuman from 'seconds-to-human';

export const Swarm = props => {
  const {Cluster} = props;
  const isManager = Cluster.ID ? true : false;
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
            <td>Node Id</td>
            <td>{props.NodeID}</td>
          </tr>
          <tr>
            <td>Node Address</td>
            <td>{props.NodeAddr}</td>
          </tr>
          <tr>
            <td>Node State</td>
            <td>{props.LocalNodeState}</td>
          </tr>
          <tr>
            <td>Manager Noes</td>
            <td>{props.Managers}</td>
          </tr>
          <tr>
            <td>Worker Nodes</td>
            <td>{props.Nodes}</td>
          </tr>
          <tr>
            <td>Is Manager</td>
            <td>{String(isManager)}</td>
          </tr>
          <tr>
            <td>Errors</td>
            <td>{props.Error}</td>
          </tr>
        </tbody>
      </table>

    {!isManager
      ?
      <fieldset className="content-group mt-30">
        <legend className="text-bold">Manager Node</legend>
        {props.RemoteManagers.map((node, i) => {
          return <table className="table table-framed" key={i}>
          <thead>
            <tr>
              <th width="160">#</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Node Id</td>
              <td>{node.NodeID}</td>
            </tr>
            <tr>
              <td>Node Id</td>
              <td>{node.Addr}</td>
            </tr>
          </tbody>
        </table>
        })}
      </fieldset>
    :
      <fieldset className="content-group mt-30">
        <legend className="text-bold">Cluster</legend>
        <table className="table table-framed">
          <thead>
            <tr>
              <th width="160">#</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cluster Id</td>
              <td>{Cluster.ID}</td>
            </tr>
            <tr>
              <td>Update</td>
              <td>{Cluster.UpdatedAt}</td>
            </tr>
            <tr>
              <td>Create</td>
              <td>{Cluster.CreatedAt}</td>
            </tr>
            <tr>
              <td colSpan="2">

                <fieldset className="content-group">
                  <legend className="text-bold">Spec</legend>
                  <table className="table table-framed">
                    <thead>
                      <tr>
                        <th width="220">#</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{Cluster.Spec.Name}</td>
                      </tr>
                      <tr>
                        <td>Task History Retention Limit</td>
                        <td>{Cluster.Spec.Orchestration.TaskHistoryRetentionLimit}</td>
                      </tr>
                      <tr>
                        <td>Raft</td>
                        <td>

                          <table className="table table-framed table-xs">
                            <tbody>
                              <tr>
                                <td>Election Tick</td>
                                <td>{Cluster.Spec.Raft.ElectionTick}</td>
                              </tr>
                              <tr>
                                <td>Heartbeat Tick</td>
                                <td>{Cluster.Spec.Raft.HeartbeatTick}</td>
                              </tr>
                              <tr>
                                <td>Log Entries For Slow Followers</td>
                                <td>{Cluster.Spec.Raft.LogEntriesForSlowFollowers}</td>
                              </tr>
                              <tr>
                                <td>Snapshot Interval</td>
                                <td>{formatToHuman(Cluster.Spec.Raft.SnapshotInterval)}</td>
                              </tr>
                            </tbody>
                          </table>

                        </td>
                      </tr>
                      <tr>
                        <td>Dispatcher</td>
                        <td>

                          <table className="table table-framed table-xs">
                            <tbody>
                              <tr>
                                <td>Election Tick</td>
                                <td>{formatToHuman(Cluster.Spec.Dispatcher.HeartbeatPeriod)}</td>
                              </tr>
                            </tbody>
                          </table>

                        </td>
                      </tr>
                      <tr>
                        <td>Certificate Authority Config</td>
                        <td>

                          <table className="table table-framed table-xs">
                            <tbody>
                              <tr>
                                <td>Node Cert Expiry</td>
                                <td>{formatToHuman(Cluster.Spec.CAConfig.NodeCertExpiry)}</td>
                              </tr>
                            </tbody>
                          </table>

                        </td>
                      </tr>
                    </tbody>
                  </table>
                </fieldset>

              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    }
    </div>
  );
};
