import React, { useState } from 'react';
import FilterClassTable from './components/FilterClassTable';
import useFetchData from './components/useFetchData';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [selectedSemester, setSelectedSemester] = useState("");
  const { data, error } = useFetchData(API_URL, selectedSemester);
  

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <>
      <FilterClassTable 
        classes={data} 
        onSemesterChange={setSelectedSemester}
        apiUrl={API_URL} />

      <ToastContainer />
    </>
  );
}

export default App;
