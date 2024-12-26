import React from 'react';

function ClassRow({ course, onAddCourse }) {

    return (
      <tr className="border-b border-x border-blue-gray-5 overflow-scroll hover:bg-blue-50">
        <td className="px-4 py-2">{course.crn}</td>
        <td className="px-4 py-2">{course.course}</td>
        <td className="px-4 py-2">{course.title}</td>
        <td className="px-4 py-2">{course.instructor}</td>
        <td className="px-4 py-2">{course.hours}</td>
        <td className="px-4 py-2">{course.time}</td>
        <td className="px-4 py-2">{course.days}</td>
        <td className="px-4 py-2">{course.location}</td>
        <td className="px-4 py-2">{course.seats}</td>
        <td className="px-4 py-2">{course.status === 'Open' ? (
          <button 
            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
            onClick={() => onAddCourse(course)}>Open</button>
        ) : (
          <span style={{color: 'red'}}>{course.status}</span>
        )}</td>
      </tr>
    );
  }

export default ClassRow;