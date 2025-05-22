import axios from "axios";
import { useState, useEffect } from "react";

export default function useFetch(url, credential = false) {
  const [datas, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isCredential = credential && { withCredentials: true };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, isCredential);
        const data = await response.data;
        setData(data);
      } catch (err) {
        setError(err.message || "someting went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchData();
  }, [url]);
  return { datas, loading, error };
}
