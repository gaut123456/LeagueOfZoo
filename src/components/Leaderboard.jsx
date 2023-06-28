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
          const isHotStreak = player[0].hotStreak;
          const winrate = calculateWinrate(player);
          return (
            <li
              key={index}
              className={`player-item ${isHotStreak ? "hot-streak" : ""}`}
            >
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
                  <span className="player-name">{player[0].summonerName}</span>
                  <span className="league-points">
                    League Points: {player[0].leaguePoints}
                  </span>
                </div>
              </div>
              <div className="player-progress">
                <div className="progress-container">
                  <ProgressBar
                    completed={winrate}
                    bgColor="#548CB4"
                    barContainerClassName="container"
                    animateOnRender={true}
                    labelAlignment="center"
                    transitionTimingFunction="ease-in-out"
                    initCompletedOnAnimation={10}
                  />
                  <div className="wins-losses">
                    <span className="player-wins">Wins: {player[0].wins}</span>
                    <span className="player-losses">
                      Losses: {player[0].losses}
                    </span>
                  </div>
                  {player[0].queueType === "RANKED_SOLO_5x5" ? (
                    <div className="opgg-lol">
                      <a
                        href={`https://euw.op.gg/summoner/userName=${player[0].summonerName}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className={`opgg-lol-img`}
                          src="https://lh3.googleusercontent.com/t7qP0LctzmCZKzP22Enh4r8CdaAyhxzwW400RM19es7pzomf7QzarZkq9WLLuyQhtwmwYTv_bLrN4BGsjkckGDKs=w128-h128-e365-rj-sc0x00ffffff"
                          alt="opgg"
                        />
                      </a>
                    </div>
                  ) : (
                    <div className="opgg-tft">
                      <a
                        href={`https://tft.op.gg/summoners/euw/${player[0].summonerName}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className={`opgg-tft-img`}
                          src={`https://lh3.googleusercontent.com/t7qP0LctzmCZKzP22Enh4r8CdaAyhxzwW400RM19es7pzomf7QzarZkq9WLLuyQhtwmwYTv_bLrN4BGsjkckGDKs=w128-h128-e365-rj-sc0x00ffffff`}
                          alt="opgg"
                        />
                      </a>
                    </div>
                  )}
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
