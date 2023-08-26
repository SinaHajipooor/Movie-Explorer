import { useEffect } from "react"

function Timer({ dispatch, secondsRemaining }) {
    // initialize the timer
    useEffect(function () {
        // get the id of the timer that we have started to clear it later
        const id = setInterval(function () {
            dispatch({ type: 'tick' })
        }, 1000);

        // clean the timer by its timer 
        return () => clearInterval(id)
    }, [dispatch])
    // UI 
    return (
        <div className="timer">
            {secondsRemaining}
        </div>
    )
}

export default Timer
