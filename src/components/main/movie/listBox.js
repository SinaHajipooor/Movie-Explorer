import { useState } from "react";


export default function Box({ children }) {
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
            children
        )}
    </div>
}