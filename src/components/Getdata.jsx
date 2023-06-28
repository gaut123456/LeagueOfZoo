import axios from "axios";
import { useEffect, useState } from "preact/hooks";

const GetData = (props) => {
  const [data, setData] = useState([]);

  const getData = () => {
    axios
      .get(`http://localhost:3000/${props.gamemode}/summoner/${props.player}`)
      .then((res) => {
        if (props.gamemode === "lol") {
          const filteredData = res.data.data.filter(
            (item) => item.queueType === "RANKED_SOLO_5x5"
          );

          setData(filteredData);
          props.setAllData((prevData) => [...prevData, filteredData]);
        } else if (props.gamemode === "tft") {
          const filteredData = res.data.data.filter(
            (item) => item.queueType === "RANKED_TFT"
          );
          setData(filteredData);
          props.setAllData((prevData) => [...prevData, filteredData]);
        }
      })
      .catch((err) => {
        console.log(`${props.player} ne joue pas à ce mode de jeu`);
      });
  };

  useEffect(() => {
    getData();
  }, [props.gamemode]);

  return null;
};

export default GetData;
