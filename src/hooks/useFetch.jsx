import { useState, useEffect } from "react";
function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  // useEffect(() => {
  //   setLoading(true);
  //   setData(null);
  //   setError("");
  //   fetch(url, options).then((response) => {
  //     if (response.ok) {
  //       response.json().then((data) => {
  //         setData(data);
  //         setLoading(false);
  //       });
  //     } else {
  //       setError(response.statusText);
  //       setLoading(false);
  //     }
  //   });
  // }, [url, options]);
  return { loading, data, error };
}

export default useFetch;
