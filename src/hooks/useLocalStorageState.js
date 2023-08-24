import { useEffect, useState } from "react";

export function useLocalStorageState({ initialState, key }) {
    // get the items
    const [value, setValue] = useState(function () {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialState;
    });

    // set the items
    // set the watched movies into local storage
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key]);


    return [value, setValue];


}