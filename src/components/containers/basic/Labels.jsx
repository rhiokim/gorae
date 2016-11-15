import React from 'react';

export const Labels = (props) => {
  const {labels} = props;
  return (
    <fieldset className="content-group">
      <legend className="text-bold">Label</legend>
      <table className="table table-framed">
        <thead>
          <tr>
            <th width="350">key</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(labels).map(key => {
          return <tr key={key}>
            <td>{key}</td>
            <td>{labels[key]}</td>
          </tr>
          })}
        </tbody>
      </table>
    </fieldset>
  );
}
