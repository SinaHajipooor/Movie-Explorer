import { useState } from "react";

export default function NavBar() {

    //UI
    return <nav className="nav-bar">
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
        {/* search */}
        <p className="num-results">
            Found <strong>X</strong> results
        </p>
    </nav>
}