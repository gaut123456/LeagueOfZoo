import React from "react";
import { useState, useEffect } from "preact/hooks";
import "./leaderboard.css";
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
    }, 150);

    return () => clearTimeout(timeout);
  }, []);

  // Sort the players based on tier, rank, and league points
  const sortedPlayers = playersDatas.sort((a, b) => {
    // Sort by tier
    if (a.data[0].tier !== b.data[0].tier) {
      return tierOrder[a.data[0].tier] - tierOrder[b.data[0].tier];
    }
    // Sort by rank
    if (a.data[0].rank !== b.data[0].rank) {
      return rankOrder[a.data[0].rank] - rankOrder[b.data[0].rank];
    }
    // Sort by league points
    return b.data[0].leaguePoints - a.data[0].leaguePoints;
  });

  return (
    <div className={`leaderboard ${isVisible ? "visible" : ""}`}>
      <h1>League Of Zoo</h1>
      <ul className="player-list">
        {sortedPlayers.map((player, index) => (
          <li key={index} className="player-item">
            <div className="player-rank">
              <span
                className="tier"
                style={{
                  backgroundColor: getTierBackgroundColor(player.data[0].tier),
                }}
              >
                {player.data[0].tier}&nbsp;
                {player.data[0].rank}
              </span>
            </div>
            <div className="player-details">
              <p className="player-name">{player.data[0].summonerName}</p>
              <p className="league-points">
                League Points: {player.data[0].leaguePoints}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
