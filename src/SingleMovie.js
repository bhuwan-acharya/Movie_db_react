import React from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "./useFetch";

const SingleMovie = () => {
  const { id } = useParams();
  const useParam = `&i=${id}`;
  const { isLoading, error, data } = useFetch(useParam);

  const {
    Poster: poster,
    Plot: plot,
    Title: title,
    Year: year,
    Actors: actors,
  } = data;
  if (isLoading) {
    return <div className={"loading"}></div>;
  }
  if (data.Response === "False") {
    return (
      <>
        <h1>{error}</h1>
        <Link to={"/"} className={"btn"}>
          Back to Home
        </Link>
      </>
    );
  } else {
    return (
      <article className={"single-movie"}>
        <img src={poster} alt={title} />
        <div className={"single-movie-info"}>
          <h1 className={"title"}>
            {title}(<span>{year}</span>)
          </h1>
          <h4>Actors : {actors}</h4>
          <p>{plot}</p>
          <Link to={"/"} className={"btn"}>
            Back to Home
          </Link>
        </div>
      </article>
    );
  }
};

export default SingleMovie;
