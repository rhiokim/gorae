import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from '../../actions/container';
import CircleChart from './stats/circleChart';
import LineChart from './stats/lineChart';
import BarChart from './stats/barChart';
import SparkLine from './stats/sparkline';

class Stats extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      interval: 7000,
      isFetching: true,
      params: {
        stream: false
      }
    };
  }

  componentWillMount() {
    this.props.fetchContainerStats(this.props.id, this.state.params);

    this.interval = setInterval(() => {
      this.props.fetchContainerStats(this.props.id, this.state.params);
    }, this.state.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderActiveTabContent() {}

  render() {
    return (
      <div>
        <CircleChart />
        <LineChart />
        <BarChart />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stats: state.containerReducer.stats
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
