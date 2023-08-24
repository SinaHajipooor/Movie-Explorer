import { useEffect, useState } from "react";

// helper variable
const APIKEY = '76e7fb94';

export function useMovies(query, callback) {
    // --------------- states ----------------
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    // --------------- methds ---------------- 
    //  fetch the list of movies depend on what use has been searched
    useEffect(function () {
        // pass the callback function to execute only if it exists 
        callback?.();
        // define the abort controller
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
        fetchMovies();

        // clean up function 
        return function () {
            controller.abort();
        }
    }, [query])

    return { movies, isLoading, error };
}