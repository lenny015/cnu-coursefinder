import { useEffect, useState } from 'react'
import './App.css'

const API_URL = "http://127.0.0.1:8000";

function FilterClassTable({ classes }) {
  const [filterText, setFilterText] = useState('');
  const [onlyOpen, setOnlyOpen] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        onlyOpen={onlyOpen}
        onFilterTextChange={setFilterText}
        onOnlyOpenChange={setOnlyOpen} />
      <ClassTable
        classes={classes}
        filterText={filterText}
        onlyOpen={onlyOpen} />
    </div>
  )
}

function SearchBar({filterText, onlyOpen, onFilterTextChange, onOnlyOpenChange}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Enter course name e.g. ACCT 200"
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input
          type="checkbox"
          checked={onlyOpen}
          onChange={(e) => onOnlyOpenChange(e.target.checked)} />
        {' '}
        Open Courses
      </label>
    </form>
  );
}

function ClassRow({ course }) {
  const status = course.status === 'Open' ? {color: 'green'} : {color: 'red'};

  return (
    <tr>
      <td>{course.crn}</td>
      <td>{course.course}</td>
      <td>{course.title}</td>
      <td>{course.instructor}</td>
      <td>{course.hours}</td>
      <td>{course.time}</td>
      <td>{course.days}</td>
      <td>{course.location}</td>
      <td>{course.seats}</td>
      <td style={status}>{course.status}</td>
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
    <table>
      <thead>
        <tr>
          <th>CRN</th>
          <th>Course</th>
          <th>Title</th>
          <th>Instructor</th>
          <th>Time</th>
          <th>Days</th>
          <th>Location</th>
          <th>Seats</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function useFetchData(API_URL) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/all_courses/?semester=202500`); //TODO: Add dropdown menu for each semester query
        const courses = await response.json();

        if (response.ok && courses.length > 0) {
          setData(courses);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [API_URL]);

  return {data, error};
}


function App() {
  const {data, error} = useFetchData(API_URL);

  if (error) {
    return <div>Error {error}</div>;
  }

  return <FilterClassTable classes={data} />
}

export default App
