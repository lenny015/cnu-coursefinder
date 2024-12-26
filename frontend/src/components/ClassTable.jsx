import React from 'react';
import ClassRow from './ClassRow';

function ClassTable({ classes, filterText, onlyOpen }) {
    const rows = [];
  
    classes.forEach((course) => {
      if (course.course.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
        return;
      }
      if (onlyOpen && course.status !== 'Open') {
        return;
      }
      rows.push(
        <ClassRow
          key={course.crn}
          course={course} />
      );
    });
  
    return (
      <div className="min-w-full overflow-x-auto rounded-md">
        <table className="w-full">
          <thead className="sticky top-0 border bg-gray-200">
            <tr className="h-3">
              <th className="p-2">CRN</th>
              <th className="p-2">Course</th>
              <th className="p-2">Title</th>
              <th className="p-2">Instructor</th>
              <th className="p-2">Credits</th>
              <th className="p-2">Time</th>
              <th className="p-2">Days</th>
              <th className="p-2">Location</th>
              <th className="p-2">Seats</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
        <tbody className="overflow-y-auto max-h-96">{rows}</tbody>
      </table>
      </div>
      
    );
  }

export default ClassTable;