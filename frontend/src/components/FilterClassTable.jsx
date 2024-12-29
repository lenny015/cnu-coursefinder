import React, {useState} from 'react';
import SearchBar from './SearchBar';
import ClassTable from './ClassTable';
import CourseSchedule from './CourseSchedule';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FilterClassTable({ classes, onSemesterChange, apiUrl }) {
  const [filterText, setFilterText] = useState('');
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  const handleCourses = (course) => {
    if (!courses.find((select) => select.crn === course.crn)) {
      const times = courses.map((c) => c.time);

      if (!validTime(course.time, times)) {
        toast.error("Error: Class times overlap in schedule", {
          position: "bottom-right",
          autoClose: 3000,
          closeOnClick: true,
          theme: "colored",
          hideProgressBar: true
        });
      } else {
        setCourses([...courses, course]);
        toast.success(course.course + " added to schedule", {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "light",
        });
      }
      
    }
  }

  const handleDeleteCourse = (crn) => {
    setCourses(courses.filter(course => course.crn !== crn));
  }

  function parseTime(time) {
    if (typeof time !== 'string') {
      console.error("Invalid time format:", time);
      return;
    }

    const [start, end] = time.split("-").map(Number);
    return {start, end};
  }

  function validTime(newTime, setTimes) {
    const {start: newStart, end: newEnd} = parseTime(newTime);

    for (const time of setTimes) {
      const {start, end} = parseTime(time);
      if (newStart < end && newEnd > start) {
        return false;
      }
    }
    return true;
  }

  const handleSemesterChange = (semester) => {
    onSemesterChange(semester);
    setCourses([]);
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-3/12 p-4">
        <h1 className="text-2xl font-bold mb-4 ml-1">CNU Course Finder</h1>
        <SearchBar
          filterText={filterText}
          onlyOpen={onlyOpen}
          onFilterTextChange={setFilterText}
          onSemesterChange={handleSemesterChange}
          onOnlyOpenChange={setOnlyOpen}
          apiUrl={apiUrl} />
        {courses.length > 0  && (
          <CourseSchedule 
          courses={courses}
          onDeleteCourse={handleDeleteCourse} />
        )}
      </div>

      {/* Table */}
      <div className="flex-1 p-4">
        <div className="w-full max-w-6xl mx-auto">
          <ClassTable
            classes={classes}
            filterText={filterText}
            onlyOpen={onlyOpen}
            onAddCourse={handleCourses} />
        </div>
      </div>
    </div>
  );
}

export default FilterClassTable;