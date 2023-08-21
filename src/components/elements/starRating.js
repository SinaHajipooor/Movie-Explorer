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
    const [rating, setRating] = useState(1);
    // methods
    function handleRating(rating) {
        setRating(rating);
    }

    // UI
    return <div style={containerStyle}>
        <div style={starContainerStyle}>
            {Array.from({ length: maxRating }, (_, i) => <Star key={i} onRate={() => handleRating(i + 1)} isFull={rating >= i + 1} />)}
        </div>
        <p style={textStyle}>{rating || ''}</p>

    </div>
}