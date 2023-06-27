import React from "react";
import { useState, useEffect } from "preact/hooks";
import "./leaderboard.css";
import ProgressBar from "@ramonak/react-progress-bar";

const Leaderboard = ({ playersDatas }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tierOrder = {
    CHALLENGER: 1,
    MASTER: 2,
    DIAMOND: 3,
    PLATINUM: 4,
    GOLD: 5,
    SILVER: 6,
    BRONZE: 7,
    IRON: 8,
  };

  const rankOrder = {
    I: 1,
    II: 2,
    III: 3,
    IV: 4,
  };

  const getTierBackgroundColor = (tier) => {
    switch (tier) {
      case "CHALLENGER":
        return "#FAD246";
      case "MASTER":
        return "#A858F2";
      case "DIAMOND":
        return "#3ABEFF";
      case "PLATINUM":
        return "#1CDAD9";
      case "GOLD":
        return "#FFD700";
      case "SILVER":
        return "#BEBEBE";
      case "BRONZE":
        return "#CD7F32";
      case "IRON":
        return "#676767";
      default:
        return "#FFFFFF";
    }
  };

  useEffect(() => {
    // Set isVisible to true after a short delay to trigger the animation
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  const calculateWinrate = (player) => {
    const { wins, losses } = player[0];
    const winrate = (wins / (wins + losses)) * 100;
    return parseFloat(winrate.toFixed(0));
  };

  // Sort the players based on tier, rank, and league points
  const sortedPlayers = playersDatas.sort((a, b) => {
    // Sort by tier
    if (a[0].tier !== b[0].tier) {
      return tierOrder[a[0].tier] - tierOrder[b[0].tier];
    }
    // Sort by rank
    if (a[0].rank !== b[0].rank) {
      return rankOrder[a[0].rank] - rankOrder[b[0].rank];
    }
    // Sort by league points
    return b[0].leaguePoints - a[0].leaguePoints;
  });

  return (
    <div className={`leaderboard ${isVisible ? "visible" : ""}`}>
      <h1>League Of Zoo</h1>
      <ul className="player-list">
        {sortedPlayers.map((player, index) => {
          const winrate = calculateWinrate(player);
          console.log(winrate);
          return (
            <li key={index} className="player-item">
              <div className="player-rank">
                <span
                  className="tier"
                  style={{
                    backgroundColor: getTierBackgroundColor(player[0].tier),
                  }}
                >
                  {player[0].tier}&nbsp;
                  {player[0].rank}
                </span>
              </div>
              <div className="player-details">
                <div>
                  <p className="player-name">{player[0].summonerName}</p>
                  <p className="league-points">
                    League Points: {player[0].leaguePoints}
                  </p>
                </div>
              </div>
              <div className="player-progress">
                <div className="progress-container">
                  <ProgressBar
                    completed={winrate}
                    bgColor="#548CB4"
                    barContainerClassName="container"
                    animateOnRender={true}
                  />
                  <div className="wins-losses">
                    <p className="player-wins">Wins: {player[0].wins}</p>
                    <p className="player-losses">Losses: {player[0].losses}</p>
                  </div>
                </div>
              </div>
              <div className="streeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaak">
                <div className="player-streak">
                  {player[0].hotStreak && <span className="hot-streak">🔥</span>}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Leaderboard;