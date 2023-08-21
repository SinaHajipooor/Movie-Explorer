import { useState } from "react";

export default function Search() {
    // states
    const [query, setQuery] = useState('');
    // UI
    return <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
    />
}