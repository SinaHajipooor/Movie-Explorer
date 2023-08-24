import { useState } from "react";
import Main from "./components/main/main";
import NavBar from "./components/navBar/navBar";
import Search from "./components/navBar/search";
import NumResults from "./components/navBar/numResults";
import MovieList from "./components/main/movie/movieList";
import Box from "./components/main/movie/listBox";
import WatchedSummary from "./components/main/watchedBox/watchedSummary";
import WatchedList from "./components/main/watchedBox/watchedList";
import Loader from "./components/elements/loader";
import ErrorMessage from "./components/elements/errorMessage";
import MovieDetails from "./components/main/movie/movieDetails";
import { useMovies } from "./hooks/useMovie";
import { useLocalStorageState } from "./hooks/useLocalStorageState";


export default function App() {
    //  ---------- state ---------- 
    const [query, setQuery] = useState('');
    const [selectedId, setSelectedId] = useState(null);  // to know which movie is selected 
    const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
    const [watched, setWatched] = useLocalStorageState([], 'watched');
    //  ---------- methods ---------- 
    function handleSelectMovie(id) {
        setSelectedId(curSelectedId => curSelectedId === id ? null : id);
    }
    function handleCloseMovie() {
        setSelectedId(null);
    }
    function handleAddWatch(movie) {
        setWatched(curWatched => [...curWatched, movie])
    }
    function handleDeleteWatched(id) {
        setWatched(curWatched => curWatched.filter(movie => movie.imdbID !== id))
    }
    //  ---------- UI ---------- 
    return (
        <>
            <NavBar >
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </NavBar>
            <Main >
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
                    {error && <ErrorMessage message={error} />}
                </Box>
                <Box>
                    {selectedId ? <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatch} watched={watched} />
                        :
                        <> <WatchedSummary watched={watched} />
                            <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched} />
                        </>
                    }
                </Box>

            </Main>
        </>
    );
}
