import { useEffect } from "react"

function Timer({ dispatch, secondsRemaining }) {
    // minuts 
    const mins = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
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
            {mins < 10 && '0'}{mins} : {seconds < 10 && '0'}{seconds}
        </div>
    )
}

export default Timer
