import React from 'react';
import TimeAgo from 'react-timeago';
import prettyBytes from 'pretty-bytes';

export const History = props => {
  const {histories} = props;
  return (
    <div>
      <table className="table table-framed">
        <thead>
          <tr>
            <th width="140">Id</th>
            <th>Created By</th>
            <th width="120">Date</th>
            <th width="120">Size</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((history, i) => {
          return <tr key={i}>
            <td>{history.Id}</td>
            <td style={{wordBreak: 'break-word', whiteSpace: 'inherit'}}>{history.CreatedBy}</td>
            <td>
              <TimeAgo date={history.Created} />
            </td>
            <td>{prettyBytes(history.Size)}</td>
          </tr>
          })}
        </tbody>
      </table>
    </div>
  );
};
