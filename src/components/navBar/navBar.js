import Logo from "./logo";
import NumResults from "./numResults";
import Search from "./search";

export default function NavBar({ movies }) {

    //UI
    return <nav className="nav-bar">
        <Logo />
        <Search />
        <NumResults movies={movies} />
    </nav>
}