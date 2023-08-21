import ListBox from "./movie/listBox";
import WatchedBox from "./watchedBox/watchedBox";


export default function Main({ movies }) {

    // UI
    return <main className="main">

        <ListBox movies={movies} />
        <WatchedBox />

    </main>
}