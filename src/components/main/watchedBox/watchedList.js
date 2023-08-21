import WatchedItem from "./watchedItem";

export default function WatchedList({ watched }) {
    return <ul className="list">
        {watched.map((movie) => (
            <WatchedItem movie={movie} />
        ))}
    </ul>
}