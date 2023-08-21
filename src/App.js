import { useState } from "react";
import Main from "./components/main/main";
import NavBar from "./components/navBar/navBar";
import { tempMovieData } from "./data/dummyData";

export default function App() {
    // state 
    const [movies, setMovies] = useState(tempMovieData);
    return (
        <>
            <NavBar movies={movies} />
            <Main movies={movies} />
        </>
    );
}
