import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }
  componentDidMount() {
    this.createBarChart();
  }
  componentDidUpdate() {
    this.createBarChart();
  }
  createBarChart() {
    const scores = this.props.data.map(students => students[1]);
    let color;
    const score = scores * 100;
    if (score < 60) {
      color = 'red';
    }
    if (score >= 60 || score <= 80) {
      color = 'yellow';
    }
    if (score > 80) {
      color = 'green';
    }
    const node = this.node;
    const dataMax = max(scores);
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]]);
    select(node)
      .selectAll('rect')
      .data(scores)
      .enter()
      .append('rect');

    select(node)
      .selectAll('rect')
      .data(scores)
      .exit()
      .remove();

    select(node)
      .selectAll('rect')
      .data(scores)
      .style('fill', color)
      .style('stroke', 'black')
      .attr('class', 'animated zoomInUp')
      .attr('x', (d, i) => i * 25)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25);
  }
  render() {
    console.log(this.props.data[0]);
    const name = this.props.data[0] ? this.props.data[0][0] : '';
    return (
      <div>
        <svg
          className="bars animated zoomInUp"
          ref={node =>
          this.node = node}
          width={300}
          height={150}
        />
        <div id="bars-name" className="bars">{name}</div>
      </div>
    );
  }
}
export default BarChart;
