import React from 'react';
import TimeAgo from 'react-timeago';
import classNames from 'classnames';
import {Icon} from 'react-mdl';
import {getTextColorClass} from 'react-mdl/lib/utils/palette';

export const State = (props) => {
  const {state} = props;
  return (
    <fieldset className="content-group mt-30">
      <legend className="text-bold">STATE</legend>
      <table className="table table-framed">
        <thead>
          <tr>
            <th width="160">#</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{width: '130px'}}>PID</td><td>{state.Pid}</td>
          </tr>
          <tr>
            <td>Status</td><td>{state.Status}</td>
          </tr>
          <tr>
            <td>ExitCode</td><td>{state.ExitCode}</td>
          </tr>
          <tr>
            <td>Restarting</td><td>{state.Restarting}</td>
          </tr>
          <tr>
            <td>Running</td><td>{state.Running ? <Icon name="play_circle_filled" className={classNames(getTextColorClass('green', 800))} /> : <Icon name="pause_circle_filled" className={classNames(getTextColorClass('grey', 400))} />}</td>
          </tr>
          <tr>
            <td style={{width: '130px'}}>Started</td><td><TimeAgo date={state.StartedAt} />{}</td>
          </tr>
        </tbody>
      </table>
    </fieldset>
    );
};
