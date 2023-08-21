import Logo from "./logo";

export default function NavBar({ children }) {

    //UI
    return <nav className="nav-bar">
        <Logo />
        {children}
    </nav>
}