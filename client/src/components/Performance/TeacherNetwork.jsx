import React, { Component } from 'react';
import d3 from 'd3';
import _ from 'lodash';

class TeacherNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /*createNetwork() {
    const { allData, profile } = this.props;
    let nodes = {
      id: profile.id,
    };
    let cohortNodes;
    let studentNodes;
    // const teacherNode;
    if (allData !== null) {
      cohortNodes = allData.map((data) => {
        return (
          <g className="node" key={data.id}>
            <circle r={10} />
            <text>{data.subject}</text>
          </g>
        );
      });
      nodes = { nodes, ...cohortNodes };
      // cohortLinks = allData.map((data) => {
        
      // });
      
      studentNodes = allData.map((data) => {
        return data.studentcohorts.map((studentcohort) => {
          const node = {};
          node.key = studentcohort.user.id;
          node.cohort_id = studentcohort.cohort_id;
          node.name = `${studentcohort.user.fName} ${studentcohort.user.lName}`;
          node.size = 5;
          return node;
        });
      });
    }
    console.log('these are cohortNodes', cohortNodes);
    console.log('these are studentNodes', studentNodes);
  }*/

  render() {
    const { allData, profile } = this.props;
    let nodes = [{
      key: `${profile.fName} ${profile.lName}`,
      size: 15,
    }];
    let cohortNodes;
    let studentNodes;
    if (allData !== null) {
      cohortNodes = allData.map((data) => {
        const node = {};
        node.key = data.id;
        node.size = 10;
        return node;
      });
      studentNodes = allData.map((data) => {
        return data.studentcohorts.map((studentcohort) => {
          const node = {};
          node.key = studentcohort.user.id;
          node.cohort_id = studentcohort.cohort_id;
          node.name = `${studentcohort.user.fName} ${studentcohort.user.lName}`;
          node.size = 5;
          return node;
        });
      });
      nodes = [...nodes, ...cohortNodes, ...studentNodes];
    }
    // console.log('these are nodes', nodes);
    // console.log('these are cohortNodes', cohortNodes);
    // console.log('these are studentNodes', studentNodes);
    // console.log('this is all the data ', allData)
    // console.log('these are the props in teachernetwork ', this.props);
    return (
      <div>
        <svg>

        </svg>
      </div>
    );
  }
}

export default TeacherNetwork;
