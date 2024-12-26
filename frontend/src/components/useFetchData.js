import {useState, useEffect} from 'react';

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

export default useFetchData;