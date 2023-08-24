import WatchedItem from "./watchedItem";

export default function WatchedList({ watched, onDeleteWatched }) {
    return <ul className="list">
        {watched?.map((movie) => (
            <WatchedItem movie={movie} key={movie.title} onDeleteWatched={onDeleteWatched} />
        ))}
    </ul>
}