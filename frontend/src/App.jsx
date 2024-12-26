import React, { useState } from 'react';
import FilterClassTable from './components/FilterClassTable';
import useFetchData from './components/useFetchData';
import './App.css';

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [selectedSemester, setSelectedSemester] = useState("");
  const { data, error } = useFetchData(API_URL, selectedSemester);

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <FilterClassTable 
      classes={data} 
      onSemesterChange={setSelectedSemester}
      apiUrl={API_URL} />
  );
}

export default App;
