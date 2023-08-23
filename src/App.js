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


const APIKEY = '76e7fb94';

export default function App() {
    // state 
    const [movies, setMovies] = useState(tempMovieData);
    const [watched, setWatched] = useState(tempWatchedData);
    const [query, setQuery] = useState();
    const [isLoading, setIsLoading] = useState(false);
    // lifecycles
    useEffect(() => {
        async function fetchMovies() {
            setIsLoading(true)
            const response = await fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`);
            const data = await response.json();
            setMovies(data.Search);
            setIsLoading(false);
        }
        fetchMovies();
    }, [])
    // UI
    return (
        <>
            <NavBar >
                <Search />
                <NumResults movies={movies} />
            </NavBar>
            <Main >
                <Box>
                    {isLoading ? <Loader /> : <MovieList movies={movies} />}
                </Box>
                <Box>
                    <WatchedSummary watched={watched} />
                    <WatchedList watched={watched} />

                </Box>

            </Main>
        </>
    );
}
