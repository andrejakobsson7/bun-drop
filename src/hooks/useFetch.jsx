import { useState, useEffect } from "react";
function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  async function fetchData(url) {
    setLoading(true);
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log("Returning", data);
      setData(data);
      return data;
    } else {
      setError(response.statusText);
      return null;
    }
  }

  async function postData(url, obj) {
    const postOptions = createPostOptions(obj);
    let apiResponse = Response;
    try {
      setLoading(true);
      apiResponse = await fetch(url, postOptions);
      setResponse(apiResponse);
    } catch (err) {
      setError(new String(err));
    } finally {
      setLoading(false);
    }
    return apiResponse;
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
