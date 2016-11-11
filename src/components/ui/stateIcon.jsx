import React from 'react';
import {Icon} from 'react-mdl';
import {getTextColorClass} from 'react-mdl/lib/utils/palette';

const c = {
  running: 'green',
  created: 'grey',
  restarting: 'green',
  paused: 'grey',
  exited: 'red',
  dead: 'blue-grey'
}

const i = {
  running: 'play_circle_outline',
  created: 'play_circle_outline',
  restarting: 'autorenew',
  paused: 'pause_circle_outline',
  exited: 'adjust',
  dead: 'error_outline'
}

const color = state => c[state];
const icon = state => i[state];

export const StateIcon = (props) => {
  const {state} = props;

  return (
    <Icon name={icon(state)} className={getTextColorClass(color(state), 500)}>
    </Icon>
  );
}
