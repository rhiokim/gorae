import React, {Component} from 'react';
import Chart from 'd3-circle';

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

    this._a.render({ value: 0 });
    this._b.render({ value: 0 });
    this._c.render({ value: 0 });
    this._d.render({ value: 0 });
    // this._c.render({ value: 0.3 });
  }

  componentDidUpdate() {
    this.changeData();
  }

  changeData = _ => {
    this._a.update({ value: Math.random() / 20 });
    this._b.update({ value: Math.random() / 20 });
    this._c.update({ value: Math.random() / 20 });
    this._d.update({ value: Math.random() / 20 });
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-3 text-center">
          <h3>CPU0</h3>
          <svg ref={a => this.a = a} className="chart center"></svg>
          <p className="mt-10" style={{fontSize: '11px'}}>Intel(R) Core(TM) i7-4850HQ CPU @ 2.30GHz.</p>
        </div>
        <div className="col-sm-3 text-center">
          <h3>CPU1</h3>
          <svg ref={b => this.b = b} className="chart center"></svg>
          <p className="mt-10" style={{fontSize: '11px'}}>Intel(R) Core(TM) i7-4850HQ CPU @ 2.30GHz.</p>
        </div>
        <div className="col-sm-3 text-center">
          <h3>CPU2</h3>
          <svg ref={c => this.c = c} className="chart center"></svg>
          <p className="mt-10" style={{fontSize: '11px'}}>Intel(R) Core(TM) i7-4850HQ CPU @ 2.30GHz.</p>
        </div>
        <div className="col-sm-3 text-center">
          <h3>CPU3</h3>
          <svg ref={d => this.d = d} className="chart center"></svg>
          <p className="mt-10" style={{fontSize: '11px'}}>Intel(R) Core(TM) i7-4850HQ CPU @ 2.30GHz.</p>
        </div>
      </div>
    );
  }
}
