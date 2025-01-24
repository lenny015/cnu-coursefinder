import React, {useState} from 'react';

function CourseSchedule({courses, onDeleteCourse}) {
    const [reviewOpen, setReviewOpen] = useState(false);

    const handleReview = () => {
        setReviewOpen(true);
    };

    const closeReview = () => {
        setReviewOpen(false);
    }

    return (
        <div className="mt-8 overflow-x-auto rounded-md">
            <h2 className="text-1xl font-bold mb-2 ml-1">Course Schedule</h2>
            <div className="rounded-md overflow-x-auto">
                <table className="w-full">
                    <thead className="sticky top-0 border bg-gray-200 rounded-md">
                        <tr className="h-2">
                            <th className="p-2">CRN</th>
                            <th className="p-2">Course</th>
                            <th className="p-2">Time</th>
                            <th className="p-2">Days</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-auto">
                        {courses.map((course) => (
                            <tr className="group border-b border-x border-blue-gray-5 overflow-scroll hover:bg-blue-50" key={course.crn}>
                                <td className="px-4 py-2">{course.crn}</td>
                                <td className="px-4 py-2">{course.course}</td>
                                <td className="px-4 py-2">{course.time}</td>
                                <td className="px-4 py-2">{course.days}</td>
                                <td className="px-4 py-2 absolute">
                                    <button 
                                        className="text-white invisible bg-red-600 rounded-md hover:bg-red-800 group-hover:visible" 
                                        onClick={() => onDeleteCourse(course.crn)}>
                                            <svg className="text-gray-400 dark:text-gray-500 w-6 h-6 p-1 " aria-hidden="true" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                    </button>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button 
                className="mt-3 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
                onClick={handleReview}>
                    Review
            </button>

            {reviewOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-3/4 max-w-4xl">
                        <h2 className="text-2xl font-bold mb-4">Full Schedule Review</h2>
                        <div className="rounded-md overflow-x-auto">
                            <table className="w-full">
                                <thead className="sticky top-0 border bg-gray-200">
                                    <tr className="h-3">
                                        <th className="p-2">CRN</th>
                                        <th className="p-2">Course</th>
                                        <th className="p-2">Instructor</th>
                                        <th className="p-2">Location</th>
                                        <th className="p-2">Time</th>
                                        <th className="p-2">Days</th>
                                        <th className="p-2">Exam Time</th>
                                    </tr>
                                </thead>
                                <tbody className="overflow-y-auto max-h-96">
                                    {courses.map((course) => (
                                        <tr className="border-b border-x border-blue-gray-5 overflow-scroll hover:bg-blue-50" key={course.crn}>
                                            <td className="px-4 py-2">{course.crn}</td>
                                            <td className="px-4 py-2">{course.course}</td>
                                            <td className="px-4 py-2">{course.instructor}</td>
                                            <td className="px-4 py-2">{course.location}</td>
                                            <td className="px-4 py-2">{course.time}</td>
                                            <td className="px-4 py-2">{course.days}</td>
                                            <td className="px-4 py-2">TBD</td> 
                                            {/* TODO: Add exam times */}
                                        </tr>
                                    
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button
                            className="mt-3 mr-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-800"
                            onClick={closeReview}>
                                Close
                        </button>
                        <button 
                            className="mt-3 mx-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-800">
                                Export to CSV
                        </button>
                        {/* TODO: Make CSV export */}
                    </div>
                    
                </div>
            )}
        </div>
    );
}

export default CourseSchedule;