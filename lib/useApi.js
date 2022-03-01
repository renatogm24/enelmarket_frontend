import { useEffect, useState } from "react";

const useApi = (url, { method, headers, body }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const fetchApi = () => {
    try {
      fetch(url, { method, headers, body }) // 'https://jsonplaceholder.typicode.com/users'
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          console.log(json);
          setLoading(false);
          setData(json);
        });
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { loading, error, data };
};

export default useApi;
