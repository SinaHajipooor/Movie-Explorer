import { useEffect, useState } from "react";
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


const APIKEY = '76e7fb94';

export default function App() {
    //  ---------- state ---------- 
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [selectedId, setSelectedId] = useState(null);  // to know which movie is selected 

    //  get the watched movies from the local storage and set the as initial value for the state  
    const [watched, setWatched] = useState(function () {
        const storedValue = localStorage.getItem('watched');
        return JSON.parse(storedValue);
    });

    //  ---------- methods ---------- 
    function handleSelectMovie(id) {
        setSelectedId(curSelectedId => curSelectedId === id ? null : id);
    }
    function handleCloseMovie() {
        setSelectedId(null);
    }
    function handleAddWatch(movie) {
        setWatched(curWatched => [...curWatched, movie])
        // // save the added movie into the local storage
        // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
    }
    function handleDeleteWatched(id) {
        setWatched(curWatched => curWatched.filter(movie => movie.imdbID !== id))
    }
    //  ---------- lifecycles ---------- 
    // set the watched movies into local storage
    useEffect(() => {
        localStorage.setItem('watched', JSON.stringify(watched))
    }, [watched])
    //  fetch the list of movies depend on what use has been searched
    useEffect(() => {
        const controller = new AbortController()
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError('');
                const response = await fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`, { signal: controller.signal });
                if (!response.ok) throw Error('failed to fetch all the movies');
                const data = await response.json();
                if (data.response === 'False') throw new Error('movie not found');
                setMovies(data.Search);
                setError('');
            } catch (err) {
                if (err.name !== 'AbortError') {

                    setError(err.message);
                }
            } finally {
                setIsLoading(false)
            }
        }
        if (query.length < 3) {
            setMovies([]);
            setError('');
            return;
        }
        handleCloseMovie();
        fetchMovies();
        // clean up function 
        return function () {
            controller.abort();
        }
    }, [query])

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
