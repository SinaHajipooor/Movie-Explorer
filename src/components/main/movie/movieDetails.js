import { useEffect, useRef, useState } from "react"
import StarRating from "../../elements/starRating";
import Loader from "../../elements/loader";

// helper feild 
const APIKEY = '76e7fb94';


export default function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
    // states 
    const countRef = useRef(0)
    const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovie] = useState({});
    const [userRating, setUserRating] = useState('');
    const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie; // destructur the info that we want , from the movie object 
    const isWatched = watched.map(movie => movie.imdbID).includes(selectedId); // to check if the current movie is in the watched list or not 
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;
    //  lifecycle 
    useEffect(() => {
        if (userRating)
            countRef.current++;
    }, [userRating])


    useEffect(function () {
        async function fetchMovieDetails() {
            setIsLoading(true);
            const response = await fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${selectedId}`)
            const data = await response.json();
            setMovie(data);
            setIsLoading(false);
        }
        fetchMovieDetails();
    }, [selectedId]);

    useEffect(function () {
        // at the very first there is no title so  : 
        if (!title) return;
        document.title = `Movie | ${title}`;
        // clean up function 
        return function () {
            document.title = 'usePopcorn';
        }
    }, [title])

    // escape the movie details when the user press the Escape on keyboard
    useEffect(() => {
        function callback(e) {
            if (e.code === 'Escape') {
                onCloseMovie();
            }
        }
        document.addEventListener('keydown', callback);
        return function () {
            document.removeEventListener('keydown', callback);
        }
    }, [onCloseMovie])

    // methods
    function handleAdd() {
        const newWatchedMovie = { imdbID: selectedId, title, runtime: Number(runtime.split(' ').at(0)), poster, year, imdbRating: Number(imdbRating), userRating, countRatingDecisions: countRef.current };
        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }
    // UI
    return <div className="details">
        {isLoading ? <Loader /> :
            <>

                <header>
                    <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
                    <img src={poster} alt={`poster of ${movie}`} />
                    <div className="details-overview">
                        <h2>{title}</h2>
                        <p>{released} &bull; {runtime}</p>
                        <p>{genre}</p>
                        <p><span>⭐</span>{imdbRating} IMDb imdbRating </p>
                    </div>
                </header>
                <section>
                    <div className="rating">
                        {!isWatched ? <> < StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                            {userRating > 0 && (<button button className="btn-add" onClick={handleAdd}>Add to list</button>)} </> : <p>You have rated this movie {watchedUserRating} <span>⭐</span></p>
                        }
                    </div>
                    <p>
                        <em>{plot}</em>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </p>
                </section>
            </>
        }
    </div >
}
