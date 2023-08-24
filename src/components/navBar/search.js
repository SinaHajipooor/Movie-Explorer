import { useEffect, useRef } from "react"

export default function Search({ query, setQuery }) {
    // ------------- states ----------------
    const inputEl = useRef()
    // ------------- lifecycle ----------------
    useEffect(() => {
        function callBack(e) {
            if (document.activeElement === inputEl) return;

            if (e.code === 'Enter') {
                inputEl.current.focus();
                setQuery('');
            }
        }
        // add the events
        document.addEventListener('keydown', callBack);
        // remove the event listener
        return () => document.removeEventListener('keydown', callBack)

    }, [setQuery])
    // ------------- UI ----------------
    return <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
    />
}