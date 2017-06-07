import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// import Bar from './Bar';

class PerformanceBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps({ data }) {
    console.log('this is the newprops in pbc', data)
  }

  render() {
    const { data, fetchStudent } = this.props;
    return (
      <BarChart
        width={1700}
        height={475}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Average" fill="blue" onClick={fetchStudent} />
      </BarChart>
    );
  }
}

export default PerformanceBarChart;
