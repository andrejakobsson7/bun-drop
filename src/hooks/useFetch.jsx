import { useState, useEffect } from "react";
function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  async function fetchData(url) {
    return fetch(url).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          return data;
        });
      } else {
        return null;
      }
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(new String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { loading, data, error, fetchData };
}

export default useFetch;
