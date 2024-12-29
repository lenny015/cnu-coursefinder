import React, {useState, useEffect} from 'react';

function SearchBar({ filterText, onlyOpen, onFilterTextChange, onOnlyOpenChange, onSemesterChange, apiUrl }) {
  const [selectValue, setSelectValue] = useState("");
  const [semesters, setSemesters] = useState({});

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await fetch(`${apiUrl}/semesters/`);
        const data = await response.json();
        setSemesters(data);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    };

    fetchSemesters();
  }, [apiUrl]);

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
        {Object.entries(semesters).reverse().map(([sem_id, name]) => (
          <option value={sem_id} key={sem_id}>{name}</option>
        ))}
      </select>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={onlyOpen}
          className="my-2 ml-1"
          onChange={(e) => onOnlyOpenChange(e.target.checked)} />
        Open Courses
      </label>
    </form>
  );
}

export default SearchBar;