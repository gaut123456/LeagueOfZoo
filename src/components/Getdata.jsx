import axios from "axios";
import { useEffect, useState } from "preact/hooks";

const GetData = (props) => {
  const [data, setData] = useState([]);

  const getData = () => {
    axios
      .get(`http://localhost:3000/${props.gamemode}/summoner/${props.player}`)
      .then((res) => {
        if (props.gamemode === "lol") {
        }
        const newData = res.data;
        setData(newData);
        props.setAllData((prevData) => [...prevData, newData]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [props.gamemode]);

  return null;
};

export default GetData;
