
import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';

const initialState = {
    //list of questions 
    questions: [],
    // possible statuses :  'loading' , 'error' , 'ready' , 'active' , 'finished'
    status: 'loading',
    // to know which question is the current question by it index
    index: 0,
    // to know which answer is the selected answer by the user
    answer: null,
    // user score
    points: 0,
    // user high score
    highScore: 0,
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
        case 'newAnswer':
            // to figure out which is the current question 
            const question = state.questions.at(state.index)
            return {
                ...state,
                answer: action.payload,
                // to update the points only if the user has choosed the correct answer (each answe has its own point value so we have to add the current points of the user with points of the current question)
                points: action.payload === question.correctOption ? state.points + question.points : state.points,
            }
        // to navigate the user ito the next question and also reset the selected answer back to null
        case 'nextQuestion': return { ...state, index: state.index + 1, answer: null }
        case 'finish': return { ...state, status: 'finished', highScore: state.points > state.highScore ? state.points : state.highScore }
        default: new Error('Action is unknown')
    }
}

export default function App() {
    // -------------- state ----------------
    // define the useReducer for managing states (destructure the state , the state has the status and questions feild )
    const [{ questions, status, index, answer, points, highScore }, dispatch] = useReducer(reducer, initialState);
    // calculate the questions count
    const numQuestions = questions.length;
    // get the maximun point that the user can get 
    const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)
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
            {status === 'active' && <>
                <Progress numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} index={index} answer={answer} />
                <Question question={questions[index]} dispatch={dispatch} answer={answer} />
                <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
            </>}
        </Main>
        {status === 'finished' && <FinishScreen maxPossiblePoints={maxPossiblePoints} points={points} highScore={highScore} />}
    </div>
}
