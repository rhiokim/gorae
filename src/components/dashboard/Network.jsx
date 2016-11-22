import React from 'react';
import {
  Sparklines, SparklinesLine, SparklinesReferenceLine, SparklinesSpots,
  SparklinesBars
} from 'react-sparklines';

export default class Network extends React.Component {

  constructor(props) {
    super(props);

    this.data1 = new Array(100).fill(0.0);
    this.state = {
      data1: this.data1
    };
  }

  componentWillMount() {
    this.changeData();
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  changeData() {
    this.data1.push(Math.random()*10);
    if(this.data1.length > 100) {
      this.data1.shift();
    }
    this.setState({data1: this.data1});
    this.interval = setTimeout(this.changeData.bind(this), 300);
  }

  render() {
    const {data1} = this.state;
    return (
      <Sparklines data={data1} width={500} height={50} limit={100}>
        <SparklinesLine style={{ strokeWidth: 4, stroke: "black", fill: "none" }} />
        <SparklinesSpots style={{ fill: "orange" }} />
      </Sparklines>
    );
  }
}
