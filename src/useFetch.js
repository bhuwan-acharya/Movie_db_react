import { useEffect, useState } from "react";
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

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
        console.log(API_ENDPOINT);
      } else {
        setError({ show: true, msg: rData.Error });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData(`${API_ENDPOINT}${useParams}`);
  }, [useParams]);
  return { isLoading, error, data };
};
