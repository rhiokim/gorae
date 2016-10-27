import React, {Component} from 'react';
import Chart from 'd3-circle';

import {
  Grid, Cell } from 'react-mdl';

import './circleChart.css';

export default class CircleChart extends Component {

  componentDidMount() {
    this._a = new Chart({
      target: this.a
    });

    this._b = new Chart({
      target: this.b
    });

    this._c = new Chart({
      target: this.c
    });

    this._d = new Chart({
      target: this.d
    });

    // const total = 3000;

    // this._c = new Chart({
    //   target: this.c,
    //   thickness: 1,
    //   format: d => `${total * d | 0}ms`,
    //   ease: 'elastic',
    //   duration: 600
    // });

    this._a.render({ value: 0.3 });
    this._b.render({ value: 0.3 });
    this._c.render({ value: 0.3 });
    this._d.render({ value: 0.3 });
    // this._c.render({ value: 0.3 });
  }

  componentDidUpdate() {
    this.changeData();
  }

  changeData = _ => {
    this._a.update({ value: Math.random() });
    this._b.update({ value: Math.random() });
    this._c.update({ value: Math.random() });
    this._d.update({ value: Math.random() });
    // this._c.update({ value: Math.random() });
  }

  render() {
    return (
      <Grid component="section" className="section--center" noSpacing>
        <Cell col={3} className="chart-area">
          <h3>CPU</h3>
          <svg ref={a => this.a = a} className="chart"></svg>
          <p>Chart default settings.</p>
        </Cell>
        <Cell col={3} className="chart-area">
          <h3>CPU</h3>
          <svg ref={b => this.b = b} className="chart"></svg>
          <p>Chart default settings.</p>
        </Cell>
        <Cell col={3} className="chart-area">
          <h3>CPU</h3>
          <svg ref={c => this.c = c} className="chart"></svg>
          <p>Chart default settings.</p>
        </Cell>
        <Cell col={3} className="chart-area">
          <h3>Memory</h3>
          <svg ref={d => this.d = d} className="chart"></svg>
          <p>Chart default settings.</p>
        </Cell>
      </Grid>
    );
  }
}
