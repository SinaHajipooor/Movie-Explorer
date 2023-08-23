
import MovieItem from "./movieItem";

export default function MovieList({ movies, onSelectMovie }) {

    // UI
    return <ul className="list list-movies">
        {movies?.map((movie) => (
            <MovieItem movie={movie} key={movie.title} onSelectMovie={onSelectMovie} />
        ))}
    </ul>
}  