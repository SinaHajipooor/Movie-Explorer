import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";


// combine all the reucers that we have 
const rootReducer = combineReducers({
    account: accountReducer, customer: customerReducer
})

// store (containes the customer and account reducer )
const store = createStore(rootReducer);


export default store;


