import React, {Component} from 'react';
import Chart from 'd3-bar';
import Tip from 'd3-tipy';
import d3 from 'd3';

import {
  Grid, Cell } from 'react-mdl';

import './barChart.css';

const gen = n => {
  const data = [];

  for (let i = n; i; i--) {
    data.push({
      bin: new Date(Date.now() - (i * 3600000)),
      value: Math.max(250, Math.random() * 3000 | 0)
    });
  }

  return data;
};

export default class BarChart extends Component {
  componentDidMount() {
    const tip = new Tip({
      format: d => d3.format(',')(d.value)
    });

    this.a = new Chart({
      target: this._a,
      width: 600,
      height: 160,
      mouseover: tip.show,
      mouseout: tip.hide
    });

    // this.b = new Chart({
    //   target: this._b,
    //   width: 220,
    //   height: 120,
    //   mouseover: tip.show,
    //   mouseout: tip.hide
    // });

    // this.c = new Chart({
    //   target: this._c,
    //   axisPadding: 5,
    //   barPadding: 15,
    //   tickSize: 3,
    //   mouseover: tip.show,
    //   mouseout: tip.hide,
    //   ease: 'elastic',
    //   color: ['RGB(0, 177, 240)', 'rgb(243, 43, 101)']
    // });

    // this.d = new Chart({
    //   target: this._d,
    //   mouseover: tip.show,
    //   mouseout: tip.hide,
    //   yDomain: [0, 10000],
    //   barPadding: 5,
    //   type: 'rect',
    //   axis: false
    // });

    this._ad = gen(24);
    this.a.render(this._ad);
    // this.b.render(gen(10));
    // this.c.render(gen(24));
    // this.d.render(gen(24));
  }

  componentDidUpdate() {
    this.changeData();
  }

  changeData = _ => {
    // const n = Math.max(15, Math.random() * 30 | 0);
    this.a.update(gen(24));
    // this.b.update(gen(10), { animate: false });
    // this.c.update(gen(24));
    // this.d.update(gen(24));
  }

  render() {
    return (
      <Grid component="section" className="section--center" noSpacing>
        <Cell col={12} className="chart-area">
          <h3>Defaults</h3>
          <p>Chart default settings.</p>
          <svg ref={a => this._a = a} className="chart chart-bar"></svg>
        </Cell>
      </Grid>
    );
  }
}
