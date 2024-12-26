import React from 'react';

function CourseSchedule({courses}) {
    return (
        <div className="mt-8 overflow-x-auto rounded-md">
            <h2 className="text-1xl font-bold mb-2 ml-1">Course Schedule</h2>
            <table className="w-full">
                <thead className="sticky top-0 border bg-gray-200">
                    <tr className="h-2">
                        <th className="p-2">CRN</th>
                        <th className="p-2">Course</th>
                        <th className="p-2">Time</th>
                        <th className="p-2">Days</th>
                    </tr>
                </thead>
                <tbody className="overflow-y-auto">
                    {courses.map((course) => (
                        <tr className="border-b border-x border-blue-gray-5 overflow-scroll hover:bg-blue-50" key={course.crn}>
                            <td className="px-4 p-2">{course.crn}</td>
                            <td className="px-4 p-2">{course.course}</td>
                            <td className="px-4 p-2">{course.time}</td>
                            <td className="px-4 p-2">{course.days}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CourseSchedule;