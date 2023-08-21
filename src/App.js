import { useState } from "react";
import Main from "./components/main/main";
import NavBar from "./components/navBar/navBar";
import { tempMovieData } from "./data/dummyData";
import Logo from "./components/navBar/logo";
import Search from "./components/navBar/search";
import NumResults from "./components/navBar/numResults";

export default function App() {
    // state 
    const [movies, setMovies] = useState(tempMovieData);
    return (
        <>
            <NavBar >
                <Logo />
                <Search />
                <NumResults movies={movies} />
            </NavBar>
            <Main movies={movies} />
        </>
    );
}
