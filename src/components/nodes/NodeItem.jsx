import React from 'react';
import classNames from 'classnames';
import prettyBytes from 'pretty-bytes';
import TimeAgo from 'react-timeago';

import {CardText, CardTitle, Card, CardActions,
  Button, Icon, IconButton, CardMenu, Menu, MenuItem } from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

const NodeItem = props => {
  let Tasks = props.Tasks || [];
  const {Description, Spec, Status} = props;
  const {Resources} = Description;
  // const state = Status.State === 'ready' ? 'sentiment_very_satisfied' : 'sentiment_very_dissatisfied';
  const color = Status.State === 'ready' ? 'green' : 'grey';
  console.log(Tasks)
  return (
    <Card shadow={0} style={{width: '320px', height: '320px', float: 'left', margin: '0 10px 10px 0'}}>
      <CardTitle expand className={classNames(getColorClass(`${color}`, '700'))} style={{color: '#fff', background: 'url(assets/images/docker-logo2-s.png) top right 5% no-repeat rgb(63, 81, 181)'}}>{Description.Hostname}
      </CardTitle>
      <CardText style={{margin: '20px 20px'}}>
        <table style={{width: '100%', fontSize: '.9em'}}>
          <tbody>
            <tr>
              <td>Role:</td>
              <td>{Spec.Role}</td>
            </tr>
            <tr>
              <td>CPUs:</td>
              <td>{Resources.NanoCPUs / 1000000000}</td>
            </tr>
            <tr>
              <td>Memory:</td>
              <td>{prettyBytes(Resources.MemoryBytes / 1024)}</td>
            </tr>
            <tr>
              <td>Created:</td>
              <td><TimeAgo date={props.CreatedAt} /></td>
            </tr>
            <tr>
              <td cols="2" className={classNames(getTextColorClass('lime', '500'))}>
                {Tasks.map(task => {
                  return <Icon name="dns" key={task.ID} colored />;
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </CardText>
      <CardActions border>
        <Button colored>View Detail</Button>
      </CardActions>
      <CardMenu style={{color: '#fff', right: '2px', top: '2px'}}>
        <IconButton name="more_vert" id={`b${props.ID}`} ripple />
      </CardMenu>
      <Menu target={`b${props.ID}`} align="right" valign="bottom">
        <MenuItem>Inspect</MenuItem>
        <MenuItem>Promote</MenuItem>
        <MenuItem>Tasks</MenuItem>
        <MenuItem>Demote</MenuItem>
        <MenuItem>Remove</MenuItem>
      </Menu>
    </Card>
    );
};

export default NodeItem;
