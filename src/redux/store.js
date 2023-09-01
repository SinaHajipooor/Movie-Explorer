const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'account/deposit':
            return { ...state, balance: state.balance + action.payload }
        case 'account/withdraw':
            return { ...state, balance: state.balance - action.payload }

        case 'account/requestLoadn':
            // he can only request a loan if he didnt reuqest it in the pas so we check if the loan is grater than zero or not 
            if (state.loan > 0) return state;
            return { ...state, loan: action.payload }
        case 'account/payLoan':
            return { ...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan }

        // here instead of throwing new Error , we just return the original state
        default:
    }
}