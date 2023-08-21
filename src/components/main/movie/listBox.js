import { useState } from "react";
import MovieList from "./movieList";

export default function ListBox({ movies }) {
    // state 
    const [isOpen1, setIsOpen1] = useState(true);
    // UI
    return <div className="box">
        <button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}
        >
            {isOpen1 ? "–" : "+"}
        </button>
        {isOpen1 && (
            <MovieList movies={movies} />
        )}
    </div>
}