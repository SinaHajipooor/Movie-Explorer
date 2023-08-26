function NextButton({ dispatch, answer }) {
    // only show the button if the user has selected any answer
    if (answer === null) return null;
    // UI
    return (
        <button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>
            Next
        </button>
    )
}

export default NextButton
