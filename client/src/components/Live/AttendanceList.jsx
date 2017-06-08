import React from 'react';
import AttendanceEntry from './AttendanceEntry';

const AttendanceList = props => (
  <div className="att-list">
    <div className="att-header">Classroom Attendance</div>
    <div className="att-box">
      {props.students.map(student => <AttendanceEntry student={student} />)}
    </div>
  </div>
  );

export default AttendanceList;
