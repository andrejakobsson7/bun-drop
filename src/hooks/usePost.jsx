import React, { useState } from "react";
function usePost(url, obj) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState([]);

  function createPostOptions(obj) {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
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

  return { postData, loading, error, response };
}

export default usePost;
