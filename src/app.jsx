import { useState } from "preact/hooks";
import "./app.css";
import Getdata from "./components/Getdata.jsx";
import Leaderboard from "./components/Leaderboard.jsx";

export function App() {
  const players = [
    "Dlck Tektiv",
    "gaut123456",
    "theauilestgros",
    "AgONie0605",
    "moudjanitosaurus",
  ];
  const [allData, setAllData] = useState([]);

  return (
    <>
      {players.map((player) => (
        <Getdata player={player} setAllData={setAllData} />
      ))}
      <Leaderboard playersDatas={allData} />
    </>
  );
}
