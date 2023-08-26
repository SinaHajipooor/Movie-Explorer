
import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';

const initialState = {
    //list of questions 
    questions: [],
    // possible statuses :  'loading' , 'error' , 'ready' , 'active' , 'finished'
    status: 'loading',
    // to know which question is the current question by it index
    index: 0,
    // to know which answer is the selected answer by the user
    answer: null,
};

function reducer(state, action) {
    switch (action.type) {
        // when the data recives successfully
        case 'dataReceived': return { ...state, questions: action.payload, status: 'ready' };
        // when the data didnt fetch successfully
        case 'dataFailed': return { ...state, status: 'error' };
        // when the user starts the quiz
        case 'start': return { ...state, status: 'active' }
        // to update the selected answer by user 
        case 'newAnswer': return { ...state, answer: action.payload }
        default: new Error('Action is unknown')
    }
}

export default function App() {
    // -------------- state ----------------
    // define the useReducer for managing states (destructure the state , the state has the status and questions feild )
    const [{ questions, status, index, answer }, dispatch] = useReducer(reducer, initialState);
    // calculate the questions count
    const numQuestions = questions.length;
    // -------------- lifecycle ----------------
    // fetch the questions list
    useEffect(function () {
        fetch('http://localhost:9000/questions').then(res => res.json()).then(data => dispatch({ type: 'dataReceived', payload: data })).catch(err => dispatch({ type: 'dataFailed' }));
    }, [])
    // -------------- UI ----------------
    return <div className="app">
        <Header />
        <Main className='main'>
            {status === 'loading' && <Loader />}
            {status === 'error' && <Error />}
            {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
            {status === 'active' && <Question question={questions[index]} dispatch={dispatch} answer={answer} />}
        </Main>
    </div>
}
