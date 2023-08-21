import { useState } from "react";
import Star from "./star";

// style object 
const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
};

const starContainerStyle = {
    display: 'flex',
};

const textStyle = {
    lineHeight: '1',
    margin: '0',
};


export default function StarRating({ maxRating = 5 }) {
    // states
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0)
    // methods
    function handleRating(rating) {
        setRating(rating);
    }

    // UI
    return <div style={containerStyle}>
        <div style={starContainerStyle}>
            {Array.from({ length: maxRating }, (_, i) => <Star key={i} onRate={() => handleRating(i + 1)} isFull={tempRating ? tempRating >= i + 1 : rating >= i + 1} onHoverIn={() => setTempRating(i + 1)} onHoverOut={() => setTempRating(0)} />)}
        </div>
        <p style={textStyle}>{tempRating || rating || ''}</p>

    </div>
}