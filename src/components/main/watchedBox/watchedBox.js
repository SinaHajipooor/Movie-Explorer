import { useState } from "react";
import { tempWatchedData } from "../../../data/dummyData";
import WatchedSummary from "./watchedSummary";
import WatchedList from "./watchedList";




export default function WatchedBox() {
    // state
    const [isOpen2, setIsOpen2] = useState(true);
    const [watched, setWatched] = useState(tempWatchedData);

    // UI
    return <div className="box">
        <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
        >
            {isOpen2 ? "–" : "+"}
        </button>
        {isOpen2 && (
            <>
                <WatchedSummary watched={watched} />
                <WatchedList watched={watched} />
            </>
        )}
    </div>
}