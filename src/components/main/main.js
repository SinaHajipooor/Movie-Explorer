import { useState } from "react";
import { tempMovieData, tempWatchedData } from "../../data/dummyData";
import ListBox from "./listBox";
import WatchedBox from "./watchedBox";


export default function Main() {

    // UI
    return <main className="main">

        <ListBox />
        <WatchedBox />

    </main>
}