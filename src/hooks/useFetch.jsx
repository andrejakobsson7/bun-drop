import { useState, useEffect } from "react";
function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  async function fetchData(url) {
    setLoading(true);
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setData(data);
      return data;
    } else {
      setError(response.statusText);
      return null;
    }
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
