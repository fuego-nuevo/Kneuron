import React, { Component } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

import Bar from './Bar';

class PerformanceBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.renderBarChart = this.renderBarChart.bind(this);
    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  componentWillReceiveProps({ data }) {
    // console.log('this is the newprops in pbc', newProps)
    this.renderBarChart(data);
  }

  handleNodeClick(name) {
    console.log('clicked on this one!', name)
  }

  renderBarChart(data) {
    const { name } = this.props;
    if (data !== null) {
      let color;
      const score = data * 100;
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
      const dataMax = max(data);
      const xScale = scaleBand()
        .domain(name.map(d => d))
      const yScale = scaleLinear()
        .domain([0, dataMax])
        .range([0, 500]);

      select(node)
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect');

      select(node)
        .selectAll('rect')
        .data(data)
        .exit()
        .remove();

      select(node)
        .selectAll('rect')
        .on('click', () => this.handleNodeClick(name))
        .data(data)
        .style('fill', color)
        .style('stroke', 'grey')
        .attr('class', 'animated zoomInUp')
        .attr('x', (d, i) => i * 25)
        .attr('y', d => 500 - yScale(d))
        .attr('height', d => yScale(d))
        .attr('width', 25);
    }
  }

  render() {
    console.log('these are the props in barchart ', this.props);
    const { data } = this.props;
    // const bars = data.map((datum) => {
    //   return (<Bar studentData={data} />);
    // });
    return (
      <svg
        className="bars animated zoomInUp"
        ref={node => this.node = node}
        width={300}
        height={300}
      />
    );
  }

}

export default PerformanceBarChart;

      {/*<div width={500} height={500}>
        <g>
          {bars}
        </g>
      </div>*/}