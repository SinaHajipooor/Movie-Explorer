
import MovieItem from "./movieItem";

export default function MovieList({ movies }) {

    // UI
    return <ul className="list">
        {movies?.map((movie) => (
            <MovieItem movie={movie} key={movie.title} />
        ))}
    </ul>
}