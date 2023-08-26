
function NextButton({ dispatch, answer, index, numQuestions }) {
    // only show the button if the user has selected any answer
    if (answer === null) return null;
    // UI
    if (index < numQuestions - 1) return (
        <button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>
            Next
        </button>
    )
    if (index === numQuestions - 1) return (
        <button className="btn btn-ui" onClick={() => dispatch({ type: 'finish' })}>
            Finish
        </button>
    )
}

export default NextButton
