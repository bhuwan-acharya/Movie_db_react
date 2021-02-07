import { useEffect, useState } from "react";
import { API_ENDPOINT } from "./context";

export const useFetch = (useParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "" });
  const [data, setData] = useState([]);

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const rData = await response.json();

      if (rData.Response === "True") {
        setData(rData.Search || rData);
        setError({ show: false, msg: "" });
      } else {
        setError({ show: true, msg: rData.Error });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(`${API_ENDPOINT}&s=${useParams}`);
  }, [useParams]);
  return { isLoading, error, data };
};
