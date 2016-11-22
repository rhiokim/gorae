import React from 'react';
import {
  Sparklines, SparklinesLine, SparklinesReferenceLine, SparklinesSpots,
  SparklinesBars
} from 'react-sparklines';

export default class Memory extends React.Component {

  constructor(props) {
    super(props);

    this.data1 = new Array(20).fill(0.0);
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
    if(this.data1.length > 20) {
      this.data1.shift();
    }
    this.setState({data1: this.data1});
    this.interval = setTimeout(this.changeData.bind(this), 1000);
  }

  render() {
    const {data1} = this.state;
    return (
      <Sparklines data={data1} width={500} height={50} limit={20}>
        <SparklinesSpots />
        <SparklinesBars style={{ stroke: "white", fill: "#41c3f9", fillOpacity: ".25" }} />
        <SparklinesReferenceLine  type="min" />
        <SparklinesLine style={{ strokeWidth: 4, stroke: 'rgba(0, 181, 241, 1)', fill: 'none' }} />
      </Sparklines>
    );
  }
}
