import { useReducer } from "react";


// this function is the first argument that we pass into the useReducer hook , this method automatically recive the current state and the action , the action is what ever we pass into the dispatch method , the reducer function should return the next state base on some condition  
function reducer(state, action) {
    // use switch statement in the reduecr function when we have many conditions to check  
    switch (action.type) {
        case 'dec':
            return { ...state, count: state.count - state.step };
        case 'inc':
            return { ...state, count: state.count + state.step };
        case 'setCount':
            return { ...state, count: action.payload }
        case 'setStep':
            return { ...state, step: action.payload }
        case 'reset':
            return { count: 0, step: 1 }
        default: throw new Error('unknown action');
    }
}


function DateCounter() {
    // define the default value of each state that we have 
    const intialState = { count: 0, step: 1 }
    // define the useReducer and pass the initial state to it 
    const [state, dispatch] = useReducer(reducer, intialState);
    // destructure the exact values that we wanto from the state that we pass into useReducer 
    const { count, step } = state;

    const dec = function () {
        // for the dispathch function we can just oass the action directly ( example :dispatch(1) ) and also we can define an object with the type and  the payload property 
        dispatch({ type: 'dec' });
    };

    const inc = function () {
        dispatch({ type: 'inc' })
    };

    // set the count 
    const defineCount = function (e) {
        // here we want to set the count base on the input value 
        dispatch({ type: 'setCount', payload: Number(e.target.value) })
    };

    // set the step
    const defineStep = function (e) {
        dispatch({ type: 'setStep', payload: Number(e.target.value) })
    };
    // reset the steps and also the count
    const reset = function () {
        dispatch({ type: 'reset' })
    };
    // This mutates the date object
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);
    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={count} onChange={defineCount} />
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
export default DateCounter;
