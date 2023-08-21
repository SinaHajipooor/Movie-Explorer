import { useState } from "react";
import { tempMovieData } from "../../../data/dummyData";
import MovieItem from "./movieItem";

export default function MovieList() {
    // state 
    const [movies, setMovies] = useState(tempMovieData);
    // UI
    return <ul className="list">
        {movies?.map((movie) => (
            <MovieItem movie={movie} />
        ))}
    </ul>
}