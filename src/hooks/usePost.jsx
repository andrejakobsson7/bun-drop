import React, { useState } from "react";
function usePost(url, obj, method) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);

  function createOptions(obj, method) {
    return {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
  }

  async function setData(url, obj, method) {
    const options = createOptions(obj, method);
    let apiResponse = Response;
    try {
      setLoading(true);
      apiResponse = await fetch(url, options);
      setResponse(apiResponse);
    } catch (err) {
      setError(new String(err));
    } finally {
      setLoading(false);
    }
    return apiResponse;
  }

  return { setData, loading, error, response };
}

export default usePost;
