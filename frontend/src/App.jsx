import { useEffect, useState } from 'react'
import './App.css'

const API_URL = "http://127.0.0.1:8000";

function FilterClassTable({ classes , onSemesterChange}) {
  const [filterText, setFilterText] = useState('');
  const [onlyOpen, setOnlyOpen] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        onlyOpen={onlyOpen}
        onFilterTextChange={setFilterText}
        onSemesterChange={onSemesterChange}
        onOnlyOpenChange={setOnlyOpen} />
      <ClassTable
        classes={classes}
        filterText={filterText}
        onlyOpen={onlyOpen} />
    </div>
  )
}

function SearchBar({filterText, onlyOpen, onFilterTextChange, onOnlyOpenChange, onSemesterChange}) {

  const[selectValue, setSelectValue] = useState("");
  const[semesters, setSemesters] = useState({});

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
  }

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
        {' '}
      </label>
      <select 
        value={selectValue} 
        onChange={handleSemesterChange}>
          <option value="">Select a semester</option>
          {Object.entries(semesters).map(([sem_id, name]) => (
            <option value={sem_id}>{name}</option>
          ))}
      </select>
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

function useFetchData(API_URL, semester) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!semester) return;

        
        const response = await fetch(`${API_URL}/all_courses/?semester=${semester}`); //TODO: Add dropdown menu for each semester query
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

  return {data, error};
}


function App() {
  const [selectedSemester, setSelectedSemester] = useState("");
  const {data, error} = useFetchData(API_URL, selectedSemester);

  if (error) {
    return <div>Error {error}</div>;
  }

  return <FilterClassTable classes={data} onSemesterChange={setSelectedSemester} />
}

export default App
