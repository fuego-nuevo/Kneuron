import React from 'react';

import PerformanceEntry from './PerformanceEntry';

const PerformanceList = props => (
  <div className="perf-body">
      {props.cohorts.map(cohort => <PerformanceEntry key={cohort.id} cohort={cohort} />)}
  </div>
  );

export default PerformanceList;
