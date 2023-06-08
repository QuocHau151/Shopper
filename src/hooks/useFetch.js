import { useEffect, useState } from "react";

export const useFetch = (promise, dependencyList = []) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");
  const [paginate, setPaginate] = useState();

  useEffect(() => {
    fetchData();
  }, dependencyList);

  const fetchData = async () => {
    try {
      setLoading(true);
      setStatus("pending");
      const res = await promise();
      setData(res.data);
      setPaginate(res?.paginate);
      setStatus("success");
    } catch (err) {
      setError(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    status,
    paginate,
  };
};
