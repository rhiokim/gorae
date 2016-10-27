import React, {Component} from 'react';
import {Sparklines, SparklinesLine, SparklinesBars,
  SparklinesSpots, SparklinesReferenceLine} from 'react-sparklines';
import {
  Grid, Cell } from 'react-mdl';

export default class SparkLine extends Component {

  constructor(props) {
    super(props);

    this.data = [];
    this.state = { data: [
      []
    ] };
  }

  componentWillReceiveProps(nextProps) {
    const {percpu_usage} = nextProps.cpu_usage;
    const system_cpu_usage = nextProps.system_cpu_usage / 100000;
    const {data} = this.state;
    let newData = [];
    percpu_usage.forEach((cpu, i) => {
      newData[i] = newData[i] || [];
      newData[i] = [ ...data[i] || [], (cpu / system_cpu_usage)];
    });
    this.setState({
      data: newData
    });
  }

  componentDidUpdate() {
    // console.log(this)
  }

  changeData = _ => {
  }

  render() {
    const {data} = this.state;
    return (
      <Grid component="section" className="section--center" noSpacing>
        <Cell col={12}>
          <Sparklines data={data[0]} width={500} height={80} limit={20}>
            <SparklinesBars style={{ stroke: 'white', fill: '#41c3f9', fillOpacity: '.15' }} />
            <SparklinesSpots />
            <SparklinesReferenceLine type="avg" />
            <SparklinesLine style={{ strokeWidth: 2, stroke: 'rgba(0, 181, 241, 1)', fill: 'none' }} />
          </Sparklines>
        </Cell>
        <Cell col={12}>
          <Sparklines data={data[0].reverse()} width={500} height={80} limit={20}>
            <SparklinesBars style={{ stroke: 'white', fill: '#41c3f9', fillOpacity: '.15' }} />
            <SparklinesSpots />
            <SparklinesReferenceLine type="avg" />
            <SparklinesLine style={{ strokeWidth: 2, stroke: 'rgba(0, 181, 241, 1)', fill: 'none' }} />
          </Sparklines>
        </Cell>
      </Grid>
    );
  }
}
