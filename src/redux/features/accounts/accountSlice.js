
const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
};


export default function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case 'account/deposit':
            return { ...state, balance: state.balance + action.payload, isLoading: false }
        case 'account/withdraw':
            return { ...state, balance: state.balance - action.payload }

        case 'account/requestLoan':
            // he can only request a loan if he didnt reuqest it in the pas so we check if the loan is grater than zero or not 
            if (state.loan > 0) return state;
            return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount }
        case 'account/payLoan':
            return { ...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan }

        case 'account/convertingCurrency':
            return { ...state, isLoading: true };
        // here instead of throwing new Error , we just return the original state
        default: return state;
    }
}



// account action creators
export function deposit(amount, currency) {
    if (currency === 'USD') return { type: 'account/deposit', payload: amount };
    // middleware function
    return async function (dispatch, getState) {
        // API call 
        dispatch({ type: 'account/convertingCurrency' })
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await response.json();
        const converted = data.rates.USD;
        // return action    
        dispatch({ type: 'account/deposit', payload: converted });
    }
}
export function withdraw(amount) {
    return { type: 'account/withdraw', payload: amount }
}
export function requestLoan(amount, purpose) {
    return { type: 'account/requestLoan', payload: { amount, purpose } }
}
export function payLoan() {
    return { type: 'account/payLoan' }
}
