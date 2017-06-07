import React from 'react';
import AttendanceEntry from './AttendanceEntry';

const AttendanceList = props => (
  <div>
      AttendanceList
      {props.students.map(student => <AttendanceEntry student={student} />)}
  </div>
  );

export default AttendanceList;
