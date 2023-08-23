import { useEffect, useState } from "react";
import Main from "./components/main/main";
import NavBar from "./components/navBar/navBar";
import { tempMovieData, tempWatchedData } from "./data/dummyData";
import Search from "./components/navBar/search";
import NumResults from "./components/navBar/numResults";
import MovieList from "./components/main/movie/movieList";
import Box from "./components/main/movie/listBox";
import WatchedSummary from "./components/main/watchedBox/watchedSummary";
import WatchedList from "./components/main/watchedBox/watchedList";
import Loader from "./components/elements/loader";
import ErrorMessage from "./components/elements/errorMessage";


const APIKEY = '76e7fb94';

export default function App() {
    // state 
    const [movies, setMovies] = useState(tempMovieData);
    const [watched, setWatched] = useState(tempWatchedData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState();
    // lifecycles
    useEffect(() => {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                const response = await fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=interstell ar`);
                if (!response.ok) throw Error('failed to fetch all the movies');
                const data = await response.json();
                if (data.response === 'False') throw new Error('movie not found');
                setMovies(data.Search);
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchMovies();
    }, [])

    // UI
    return (
        <>
            <NavBar >
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </NavBar>
            <Main >
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && <MovieList movies={movies} />}
                    {error && <ErrorMessage message={error} />}
                </Box>
                <Box>
                    <WatchedSummary watched={watched} />
                    <WatchedList watched={watched} />

                </Box>

            </Main>
        </>
    );
}
