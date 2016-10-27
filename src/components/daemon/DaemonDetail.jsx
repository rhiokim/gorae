import React, {Component} from 'react';

// import * as Actions from '../../actions/container';

export default class DaemonDetail extends Component {
  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props.info, null, 2)}</pre>
      </div>
    );
  }
}
