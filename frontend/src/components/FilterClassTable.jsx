import React, {useState} from 'react';
import SearchBar from './SearchBar';
import ClassTable from './ClassTable';
import CourseSchedule from './CourseSchedule';

function FilterClassTable({ classes, onSemesterChange, apiUrl }) {
  const [filterText, setFilterText] = useState('');
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  const handleCourses = (course) => {
    if (!courses.find((select) => select.crn === course.crn)) {
      setCourses([...courses, course]);
    }
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
          courses={courses} />
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