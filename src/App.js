import { useState } from "react";
import Main from "./components/main/main";
import NavBar from "./components/navBar/navBar";
import { tempMovieData } from "./data/dummyData";
import Search from "./components/navBar/search";
import NumResults from "./components/navBar/numResults";
import ListBox from "./components/main/movie/listBox";
import WatchedBox from "./components/main/watchedBox/watchedBox";
import MovieList from "./components/main/movie/movieList";

export default function App() {
    // state 
    const [movies, setMovies] = useState(tempMovieData);
    return (
        <>
            <NavBar >
                <Search />
                <NumResults movies={movies} />
            </NavBar>
            <Main >
                <ListBox >
                    <MovieList movies={movies} />
                </ListBox>
                <WatchedBox />
            </Main>
        </>
    );
}
