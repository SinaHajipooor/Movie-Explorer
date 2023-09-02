import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    fullName: '',
    nationalID: '',
    createdAt: ''
}

// --------- classic redux -----------
// export default function customerReducer(state = initilaStateCustomer, action) {
//     switch (action.type) {
//         case 'customer/createCustomer':
//             return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt }
//         case 'customer/updateName':
//             return { ...state, fullName: action.payload }

//         default: return state;

//     };
// }


// // customer action creators 
// export function createCustomer(fullName, nationalID) {
//     return { type: 'customer/createCustomer', payload: { fullName, nationalID, createdAt: new Date().toISOString() } }
// }

// export function updateName(fullName) {
//     return { type: 'customer/updateName', payload: fullName }
// }

// --------- redux toolkit -----------
const customerSlice = createSlice({
    name: 'customer', initialState, reducers: {
        createCustomer: {
            prepare(fullName, nationalID) {
                return {
                    payload: { fullName, nationalID }
                }
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
                state.createdAt = new Date().toISOString();
            }
        },
        updateName(state, action) {
            state.fullName = action.payload;
        }
    }
})

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;