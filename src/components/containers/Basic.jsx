import React from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import TimeAgo from 'react-timeago';
import dateFormat from 'dateformat';

import * as Actions from '../../actions/container';
import BindingsForm from './basic/Bindings';
import EnvironmentForm from './basic/Environment';
import Changes from './Changes';
import {Labels} from './basic/Labels';
import {Network} from './basic/Network';
import {Path} from './basic/Path';
import {State} from './basic/State';

class Basic extends React.Component {
  constructor(props) {
    super(props);

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
  }

  render() {
    const {container} = this.props;

    if (!container.Id) {
      return <i></i>;
    }

    let {Config} = container;

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
              <td>{container.Name}</td>
            </tr>
            <tr>
              <td>Id</td>
              <td>{container.Id}</td>
            </tr>
            <tr>
              <td>Image</td>
              <td>
                <Link to={`images/${container.Image}`}>{container.Config.Image}</Link>
              </td>
            </tr>
            <tr>
              <td>Created</td>
              <td><TimeAgo date={container.Created} /> <small className="text-muted">({dateFormat(container.Created, "dddd, mm dS, yyyy, h:MM:ss TT")})</small></td>
            </tr>
            <tr>
              <td>Exposed Ports</td>
              <td>{container.Config.ExposedPorts && Object.keys(container.Config.ExposedPorts).join(', ')}</td>
            </tr>
            <tr>
              <td>Entrypoint</td>
              <td>{JSON.stringify(container.Config.Entrypoint || [])}</td>
            </tr>
            <tr>
              <td>Command</td>
              <td>{JSON.stringify(container.Config.Cmd || [])}</td>
            </tr>
            <tr>
              <td>Path</td>
              <td>{container.Path}</td>
            </tr>
            <tr>
              <td>Args</td>
              <td>{container.Args}</td>
            </tr>
            <tr>
              <td>Driver</td>
              <td>{container.Driver}</td>
            </tr>
            <tr>
              <td>Restart Count</td>
              <td>{container.RestartCount}</td>
            </tr>
          </tbody>
        </table>

        <BindingsForm container={container} />
        <EnvironmentForm container={container} />
        <Labels labels={Config.Labels} />
        <Network network={container.NetworkSettings} />
        <State state={container.State} />
        <Path container={container} />
        <Changes id={container.Id} />
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
