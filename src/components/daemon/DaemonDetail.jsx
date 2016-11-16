import React, {Component} from 'react';

// import * as Actions from '../../actions/container';
import {Swarm} from './Swarm';

export default class DaemonDetail extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <Swarm {...this.props.Swarm} />
      </div>
    );
  }
}
