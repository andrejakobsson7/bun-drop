import React, { useState } from "react";
function usePost(url, obj, method) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [response, setResponse] = useState({});
  const [data, setData] = useState(null);

  function createOptions(obj, method) {
    return {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
  }

  async function saveData(url, obj, method) {
    const options = createOptions(obj, method);
    setError("");
    setData(null);
    try {
      setLoading(true);
      const apiResponse = await fetch(url, options);
      setResponse(apiResponse);
      const data = await apiResponse.json();
      setData(data);
    } catch (err) {
      setError(new String(err));
    } finally {
      setLoading(false);
    }
  }

  return { saveData, loading, error, response, data };
}

export default usePost;
