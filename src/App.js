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


const APIKEY = '76e7fb94';

export default function App() {
    // state 
    const [movies, setMovies] = useState(tempMovieData);
    const [watched, setWatched] = useState(tempWatchedData);
    // lifecycles
    useEffect(function () {
        fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&s=interstellar`).then(res => res.json()).then(data => setMovies(data.Search));
    }, [])
    // UI
    return (
        <>
            <NavBar >
                <Search />
                <NumResults movies={movies} />
            </NavBar>
            <Main >
                <Box element={<MovieList movies={movies} />} />
                <Box element={
                    <>
                        <WatchedSummary watched={watched} />
                        <WatchedList watched={watched} />
                    </>
                } />

            </Main>
        </>
    );
}
