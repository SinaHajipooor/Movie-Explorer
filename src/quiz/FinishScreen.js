function FinishScreen({ points, maxPossiblePoints, highScore }) {
    // calc the percentage 
    const percentage = (points / maxPossiblePoints) * 100;
    // UI 
    return (
        <>
            <p className="result">
                You scored <strong>{points}</strong> out of ({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">high score : {highScore} points</p>
        </>
    )
}

export default FinishScreen;
