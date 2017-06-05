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
    let color;
    const score = this.props.data * 100;
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
    const dataMax = max(this.props.data);
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]]);
    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect');

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove();

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', color)
      .style('stroke', 'black')
      .attr('class', 'animated zoomInUp')
      .attr('x', (d, i) => i * 25)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25);
  }
  render() {
    return (
      <svg
        className="bars animated zoomInUp"
        ref={node =>
          this.node = node}
        width={300}
        height={150}
      />
    );
  }
}
export default BarChart;