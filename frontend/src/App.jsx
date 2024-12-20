import { useEffect, useState } from 'react';
import './App.css';

const API_URL = "http://127.0.0.1:8000";

function FilterClassTable({ classes, onSemesterChange }) {
  const [filterText, setFilterText] = useState('');
  const [onlyOpen, setOnlyOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-2/12 p-4">
        <h1 className="text-2xl font-bold mb-4 ml-1">CNU Course Finder</h1>
        <SearchBar
          filterText={filterText}
          onlyOpen={onlyOpen}
          onFilterTextChange={setFilterText}
          onSemesterChange={onSemesterChange}
          onOnlyOpenChange={setOnlyOpen} />
      </div>

      {/* Table */}
      <div className="flex-1 p-4">
        <div className="w-full max-w-6xl mx-auto">
          <ClassTable
            classes={classes}
            filterText={filterText}
            onlyOpen={onlyOpen} />
        </div>
      </div>
    </div>
  );
}

function SearchBar({ filterText, onlyOpen, onFilterTextChange, onOnlyOpenChange, onSemesterChange }) {
  const [selectValue, setSelectValue] = useState("");
  const [semesters, setSemesters] = useState({});

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await fetch(`${API_URL}/semesters/`);
        const data = await response.json();
        setSemesters(data);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    };

    fetchSemesters();
  }, []);

  const handleSemesterChange = (e) => {
    const newValue = e.target.value;
    setSelectValue(newValue);
    onSemesterChange(newValue);
  };

  return (
    <form className="space-y-4">
      <input
        type="text"
        value={filterText}
        placeholder="Enter course name e.g. ACCT 200"
        className="w-full p-2 border rounded-md"
        onChange={(e) => onFilterTextChange(e.target.value)} />

      <select
        value={selectValue}
        onChange={handleSemesterChange}
        className="w-full p-2 border rounded-md">
        <option value="">Select a semester</option>
        {Object.entries(semesters).map(([sem_id, name]) => (
          <option value={sem_id} key={sem_id}>{name}</option>
        ))}
      </select>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={onlyOpen}
          className="my-3 ml-1"
          onChange={(e) => onOnlyOpenChange(e.target.checked)} />
        Open Courses
      </label>
    </form>
  );
}

function ClassRow({ course }) {
  const status = course.status === 'Open' ? { color: 'green' } : { color: 'red' };

  return (
    <tr>
      <td className="px-4 py-2">{course.crn}</td>
      <td className="px-4 py-2">{course.course}</td>
      <td className="px-4 py-2">{course.title}</td>
      <td className="px-4 py-2">{course.instructor}</td>
      <td className="px-4 py-2">{course.hours}</td>
      <td className="px-4 py-2">{course.time}</td>
      <td className="px-4 py-2">{course.days}</td>
      <td className="px-4 py-2">{course.location}</td>
      <td className="px-4 py-2">{course.seats}</td>
      <td className="px-4 py-2" style={status}>{course.status}</td>
    </tr>
  );
}

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
    <div className="min-w-full overflow-x-auto">
      <table className="w-full">
        <thead className="sticky top-0">
          <tr className="h-3">
            <th className="border p-2">CRN</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Instructor</th>
            <th className="border p-2">Credits</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Days</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Seats</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
      <tbody className="overflow-y-auto max-h-96">{rows}</tbody>
    </table>
    </div>
    
  );
}

function useFetchData(API_URL, semester) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!semester) return;

        const response = await fetch(`${API_URL}/all_courses/?semester=${semester}`);
        const courses = await response.json();

        if (response.ok && courses.length > 0) {
          setData(courses);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [API_URL, semester]);

  return { data, error };
}

function App() {
  const [selectedSemester, setSelectedSemester] = useState("");
  const { data, error } = useFetchData(API_URL, selectedSemester);

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <FilterClassTable classes={data} onSemesterChange={setSelectedSemester} />
  );
}

export default App;
