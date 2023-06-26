import React from "react";
import axios from "axios";
import { useState, useEffect } from "preact/hooks";
const GetData = (props) => {
  const [data, setData] = useState([]);

  const getData = () => {
    axios
      .get(`http://localhost:3000/lol/summoner/${props.player}`)
      .then((res) => {
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
  }, []);
};

export default GetData;
