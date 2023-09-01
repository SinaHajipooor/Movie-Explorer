import { combineReducers, createStore } from "redux";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
};

const initilaStateCustomer = {
    fullName: '',
    nationalID: '',
    createdAt: ''
}


function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case 'account/deposit':
            return { ...state, balance: state.balance + action.payload }
        case 'account/withdraw':
            return { ...state, balance: state.balance - action.payload }

        case 'account/requestLoadn':
            // he can only request a loan if he didnt reuqest it in the pas so we check if the loan is grater than zero or not 
            if (state.loan > 0) return state;
            return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount }
        case 'account/payLoan':
            return { ...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan }

        // here instead of throwing new Error , we just return the original state
        default:
    }
}
function customerReducer(state = initilaStateCustomer, action) {
    switch (action.type) {
        case 'customer/createCustomer':
            return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt }
        case 'customer/updateName':
            return { ...state, fullName: action.payload }

        default: return state;

    }
}


// combine all the reucers that we have 
const rootReducer = combineReducers({
    account: accountReducer, customer: customerReducer
})

// store (containes the customer and account reducer )
const store = createStore(rootReducer);



// account action creators
function deposit(amount) {
    return { type: 'account/deposit', payload: amount };
}
function withdraw(amount) {
    return { type: 'account/withdraw', payload: amount }
}
function requestLoan(amount, purpose) {
    return { type: 'account/requestLoan', payload: { amount, purpose } }
}
function payLoan() {
    return { type: 'account/payLoan' }
}


// customer action creators 
function createCustomer(fullName, nationalID) {
    return { type: 'customer/createCustomer', payload: { fullName, nationalID, createdAt: new Date().toISOString() } }
}

function updateName(fullName) {
    return { type: 'customer/updateName', payload: fullName }
}