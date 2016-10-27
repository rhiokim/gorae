import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Checkbox} from 'react-mdl';

import * as Actions from '../../actions/container';

class Logs extends Component {
  constructor(...args) {
    super(...args);

    this.stdout = this.stdout.bind(this);
    this.stderr = this.stderr.bind(this);
    this.tail = this.tail.bind(this);
    this.timestamps = this.timestamps.bind(this);

    this.state = {
      isFetching: true,
      interval: 5000,
      params: {
        stdout: 1,
        stderr: 1,
        timestamps: 0,
        tail: 21
      }
    };
  }

  componentWillMount() {
    this.props.fetchContainerLogs(this.props.id, this.state.params);

    this.interval = setInterval(() => {
      this.setState({
        isFetching: true
      });
      this.props.fetchContainerLogs(this.props.id, this.state.params);
    }, this.state.interval);
  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      isFetching: false
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  stdout(e) {
    const params = Object.assign({}, this.state.params, {
      stdout: e.target.checked
    });
    this.setState({params});
  }

  stderr(e) {
    const params = Object.assign({}, this.state.params, {
      stderr: e.target.checked
    });
    this.setState({params});
  }

  timestamps(e) {
    const params = Object.assign({}, this.state.params, {
      timestamps: e.target.checked
    });
    this.setState({params});
  }

  tail(e) {
    const params = Object.assign({}, this.state.params, {
      tail: e.target.value
    });
    this.setState({params});
  }

  renderActiveTabContent() {}

  render() {
    return (
      <div>
        {/*isFetching ? <Spinner /> : ''*/}
        <div style={{float: 'left', marginRight: '15px'}}>
          <Checkbox label="stdout" ripple defaultChecked onChange={this.stdout} />
        </div>
        <div style={{float: 'left', marginRight: '10px'}}>
          <Checkbox label="stderr" ripple defaultChecked onChange={this.stderr} />
        </div>
        <div style={{float: 'left', marginTop: '1px'}}>
          <input type="number" placeholder="21" className="mdl-input__box-outline" style={{width: '60px'}} onChange={this.tail} /> lines
        </div>
        <div style={{float: 'right', marginRight: '10px'}}>
          <Checkbox label="timestamp" onChange={this.timestamps} />
        </div>

        <pre style={{clear: 'both'}}>{this.props.logs}</pre>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logs: state.containerReducer.logs
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
