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



export default function StarRating({ maxRating = 5, color = '#fcc419', size = 48, className = "", onSetRating }) {
    // states
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0)

    const textStyle = {
        lineHeight: '1',
        margin: '0',
        color,
        fontSize: `${size / 1.5}px`,
    };

    // methods
    function handleRating(rating) {
        setRating(rating);
        // use this to allow user to set the rating from outside of this component
        onSetRating(rating);
    }

    // UI
    return <div style={containerStyle} className={className}>
        <div style={starContainerStyle}>
            {Array.from({ length: maxRating }, (_, i) => <Star key={i} onRate={() => handleRating(i + 1)} isFull={tempRating ? tempRating >= i + 1 : rating >= i + 1} onHoverIn={() => setTempRating(i + 1)} onHoverOut={() => setTempRating(0)} color={color} size={size} />)}
        </div>
        <p style={textStyle}>{tempRating || rating || ''}</p>

    </div>
}