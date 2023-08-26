
import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';


const initialState = {
    questions: [],
    // possible statuses :  'loading' , 'error' , 'ready' , 'active' , 'finished'
    status: 'loading',
};

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived': return { ...state, questions: action.payload, status: 'ready' };
        case 'dataFailed': return { ...state, status: 'error' }
        default: new Error('Action is unknown')
    }
}

export default function App() {
    // -------------- state ----------------
    // define the useReducer for managing states (destructure the state , the state has the status and questions feild )
    const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
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
            {status === 'ready' && <StartScreen numQuestions={numQuestions} />}
        </Main>
    </div>
}
