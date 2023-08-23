import { useEffect, useState } from "react"
import StarRating from "../../elements/starRating";
import Loader from "../../elements/loader";

// helper feild 
const APIKEY = '76e7fb94';


export default function MovieDetails({ selectedId, onCloseMovie }) {
    // states 
    const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovie] = useState({});
    const { Title: title, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie; // destructur the info that we want , from the movie object 
    //     lifecycle 
    useEffect(function () {
        async function fetchMovieDetails() {
            setIsLoading(true);
            const response = await fetch(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${selectedId}`)
            const data = await response.json();
            setMovie(data);
            setIsLoading(false);
        }
        fetchMovieDetails();
    }, [selectedId])
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
                        <StarRating maxRating={10} size={24} />

                    </div>
                    <p>
                        <em>{plot}</em>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </p>
                </section>
            </>
        }
    </div>
}
