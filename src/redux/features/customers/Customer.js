import { useSelector } from "react-redux";

function Customer() {
    // states
    // get the customer data from store 
    const customer = useSelector(store => store.customer.fullName);
    // ui
    return <h2>👋 Welcome,{customer}</h2>;
}

export default Customer;
