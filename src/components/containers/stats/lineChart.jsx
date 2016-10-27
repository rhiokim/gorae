import React, {Component} from 'react';
import Chart from 'd3-line';
import Tip from 'd3-tipy';
import d3 from 'd3';

import {
  Grid, Cell } from 'react-mdl';

import './lineChart.css';

const gen = n => {
  const data = [];

  for (let i = 0; i < n; i++) {
    data.push({
      bin: new Date(Date.now() - (i * 3600000)),
      time: new Date(Date.now() - (i * 7000)),
      value: Math.max(250, Math.random() * 3000 | 0)
    });
  }

  return data;
};

export default class LineChart extends Component {
  componentDidMount() {
    const tip = new Tip({
      format: d => d3.format(',')(d.value)
    });

    this._a = new Chart({
      target: this.a,
      width: 600,
      xTicks: 10,
      yTicks: 12,
      mouseover: tip.show,
      mouseout: tip.hide
    });

    this._b = new Chart({
      target: this.b,
      width: 600,
      xTicks: 10,
      yTicks: 12,
      mouseover: tip.show,
      mouseout: tip.hide
    });

    this._a.render(gen(24));
    this._b.render(gen(24));
  }

  componentDidUpdate() {
    this.changeData();
  }

  changeData = _ => {
    this._a.render(gen(24));
    this._b.update(gen(24));
  }

  render() {
    return (
      <Grid component="section" className="section--center" noSpacing>
        <Cell col={12}>
          <h3>Networks eth0 <small>(Rx/Tx Data)</small></h3>
          <svg ref={a => this.a = a} className="chart"></svg>
        </Cell>
        <Cell col={12}>
          <h3>Networks eth5 <small>(Rx/Tx Data)</small></h3>
          <svg ref={b => this.b = b} className="chart"></svg>
        </Cell>
      </Grid>
    );
  }
}
