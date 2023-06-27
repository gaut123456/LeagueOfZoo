import { useState } from "preact/hooks";
import "./app.css";
import Getdata from "./components/Getdata.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import Header from "./components/Header.jsx";

export function App() {
  const players = [
    "Dlck Tektiv",
    "gaut123456",
    "theauilestgros",
    "AgONie0605",
    "moudjanitosaurus",
    "noskilijustluck ",
    "Loülou",
  ];
  const [allData, setAllData] = useState([]);
  const [gamemode, setGamemode] = useState("tft");

  const handleGamemodeChange = (newGamemode) => {
    if (newGamemode === gamemode) {
      return;
    }
    setGamemode(newGamemode);
    setAllData([]); // Réinitialiser les données du tableau à chaque changement de mode de jeu
  };

  return (
    <>
      <Header setGamemode={handleGamemodeChange} />
      {players.map((player) => (
        <Getdata
          player={player}
          setAllData={setAllData}
          gamemode={gamemode}
          key={player} // Ajoutez une clé unique pour chaque itération de la boucle
        />
      ))}
      <Leaderboard playersDatas={allData} />
    </>
  );
}
