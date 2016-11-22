import React, {Component} from 'react';
import {Sparklines, SparklinesLine,
  SparklinesSpots} from 'react-sparklines';

function calculateCPUPercent(stats) {
    // Same algorithm the official client uses: https://github.com/docker/docker/blob/master/api/client/stats.go#L195-L208
    var prevCpu = stats.precpu_stats;
    var curCpu = stats.cpu_stats;

    var cpuPercent = 0.0;

    // calculate the change for the cpu usage of the container in between readings
    var cpuDelta = curCpu.cpu_usage.total_usage - prevCpu.cpu_usage.total_usage;
    // calculate the change for the entire system between readings
    var systemDelta = curCpu.system_cpu_usage - prevCpu.system_cpu_usage;

    if (systemDelta > 0.0 && cpuDelta > 0.0) {
        cpuPercent = (cpuDelta / systemDelta) * curCpu.cpu_usage.percpu_usage.length * 100.0;
    }
    return cpuPercent;
}

export default class SparkLine extends Component {

  constructor(props) {
    super(props);

    this.data = new Array(20).fill(0.0);
    this.state = { data: this.data };
  }

  componentWillReceiveProps(nextProps) {
    const res = calculateCPUPercent(nextProps);
    this.data.push(Math.random());
    console.log(res)
    this.setState({data: this.data});
  }

  componentDidUpdate() {
    // console.log(this)
  }

  changeData = _ => {
  }

  render() {
    const {data} = this.state;
    return (
      <div className="row">
        <div className="col-md-6">
          <h3>CPU</h3>
          <Sparklines data={data} width={500} height={80} limit={20}>
            <SparklinesSpots />
            <SparklinesLine style={{ strokeWidth: 2, stroke: 'rgba(0, 181, 241, 1)', fill: 'none' }} />
          </Sparklines>
        </div>
        <div className="col-md-6">
          <h3>CPU</h3>
          <Sparklines data={data} width={500} height={80} limit={20}>
            <SparklinesSpots />
            <SparklinesLine style={{ strokeWidth: 1, stroke: 'rgba(0, 181, 241, 1)', fill: 'none' }} />
          </Sparklines>
        </div>
      </div>
    );
  }
}
