import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import TimeAgo from 'react-timeago';

import {Grid, Cell, Icon} from 'react-mdl';
import {getTextColorClass} from 'react-mdl/lib/utils/palette';

import * as Actions from '../../actions/container';
import BindingsForm from './form/Bindings';
import EnvironmentForm from './form/Environment';

class Basic extends Component {
  constructor(...args) {
    super(...args);

    this.updateMount = this.updateMount.bind(this);
  }

  componentWillMount() {
    this.props.fetchContainer(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.forms);
    // const type = nextProps
  }

  updateMount(e) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    const {container} = this.props;

    if (!container.Id) {
      return <i></i>;
    }

    let {HostnamePath, State, Config} = container;

    return (
      <div>
        <h3 className="no-margin">{container.Name}</h3>
        <table style={{width: '100%', margin: '10px 0 20px 14px', fontSize: '.9em'}}>
          <tbody>
            <tr>
              <td style={{width: '130px'}}>Id</td><td>{container.Id}</td>
            </tr>
            <tr>
              <td>Image</td><td>{container.Image}</td>
            </tr>
            <tr>
              <td>Created</td><td>{container.Created}</td>
            </tr>
            <tr>
              <td>Path</td><td>{container.Path}</td>
            </tr>
            <tr>
              <td>Args</td><td>{container.Args}</td>
            </tr>
            <tr>
              <td>Driver</td><td>{container.Driver}</td>
            </tr>
            <tr>
              <td>RestartCount</td><td>{container.RestartCount}</td>
            </tr>
          </tbody>
        </table>
        <h4 className="no-margin">Path</h4>
        <table style={{width: '100%', margin: '10px 0 20px 14px', fontSize: '.9em'}}>
          <tbody>
            <tr>
              <td style={{width: '130px'}}>Hostname path</td><td>{HostnamePath}</td>
            </tr>
            <tr>
              <td>Hosts path</td><td>{container.HostsPath}</td>
            </tr>
            <tr>
              <td>Log path</td><td>{container.LogPath}</td>
            </tr>
            <tr>
              <td>ResolvConf path</td><td>{container.ResolvConfPath}</td>
            </tr>
          </tbody>
        </table>
        <h4 className="no-margin">State</h4>
        <table style={{width: '100%', margin: '10px 0 20px 14px', fontSize: '.9em'}}>
          <tbody>
            <tr>
              <td style={{width: '130px'}}>PID</td><td>{State.Pid}</td>
            </tr>
            <tr>
              <td>Status</td><td>{State.Status}</td>
            </tr>
            <tr>
              <td>ExitCode</td><td>{State.ExitCode}</td>
            </tr>
            <tr>
              <td>Restarting</td><td>{State.Restarting}</td>
            </tr>
            <tr>
              <td>Running</td><td>{State.Running ? <Icon name="play_circle_filled" className={classNames(getTextColorClass('green', 800))} /> : <Icon name="pause_circle_filled" className={classNames(getTextColorClass('grey', 400))} />}</td>
            </tr>
            <tr>
              <td style={{width: '130px'}}>Started</td><td><TimeAgo date={State.StartedAt} />{}</td>
            </tr>
          </tbody>
        </table>
        <h4 className="no-margin">Volume Mounting</h4>
        <BindingsForm mounts={container.Mounts} />
        <h4 className="no-margin">Environment Variables</h4>
        <EnvironmentForm env={Config.Env} />
        <Grid component="div" className="section--center">
          <Cell col={12}>
            <h4>State</h4>
            <pre>{JSON.stringify(container.State, null, 2)}</pre>
          </Cell>
          <Cell col={12}>
            <h4>HostConfig</h4>
            <pre>{JSON.stringify(container.HostConfig, null, 2)}</pre>
          </Cell>
          <Cell col={12}>
            <h4>Config</h4>
            <pre>{JSON.stringify(container.Config, null, 2)}</pre>
          </Cell>
          <Cell col={12}>
            <h4>NetworkSettings</h4>
            <pre>{JSON.stringify(container.NetworkSettings, null, 2)}</pre>
          </Cell>
          <Cell col={12}>
            <h4>GraphDriver</h4>
            <pre>{JSON.stringify(container.GraphDriver, null, 2)}</pre>
          </Cell>
          <Cell col={12}>
            <h4>Mounts</h4>
            <pre>{JSON.stringify(container.Mounts, null, 2)}</pre>
          </Cell>
        </Grid>
        <pre>{JSON.stringify(this.props.container, null, 2)}</pre>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  container: state.containerReducer.container,
  forms: state.formReducer.forms
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Basic);
