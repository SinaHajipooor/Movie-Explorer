import { useState } from "react";


export default function Box({ element }) {
    // state 
    const [isOpen, setIsOpen] = useState(true);
    // UI
    return <div className="box">
        <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
        >
            {isOpen ? "–" : "+"}
        </button>
        {isOpen && (
            element
        )}
    </div>
}