import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { configure } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";

// ----------- classic redux -----------
// // combine all the reucers that we have 
// const rootReducer = combineReducers({
//     account: accountReducer, customer: customerReducer
// })

// // store (containes the customer and account reducer )
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// ----------- modern redux (redux toolkit ) -----------
const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer,
    }
});

export default store;


