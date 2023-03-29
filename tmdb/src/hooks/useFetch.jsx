import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setisLoading("Loading...");
    setData(null);
    setError(null);
    fetchDataFromApi(url)
      .then((res) => {
        setisLoading(false);
        setData(res);
      })
      .catch((err) => {
        setisLoading(false);
        setError("something went wrong !");
      });
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
