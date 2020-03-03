import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard.js";
import axios from "axios";
import "./App.css";

const url = process.env.REACT_APP_SERVER_URL;
const apikey = process.env.REACT_APP_MY_KEY;

axios.interceptors.request.use(
  options => {
    options.headers.authorization = `Token ${apikey}`;
    return options;
  },
  error => {
    return Promise.reject(error);
  }
);

const App = () => {
  const [advData, setAdvData] = useState(null);
  const [reload, setReload] = useState(true);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const sortList = key => {
    let tempData = advData;
    if (sortDir === "asc") {
      tempData.sort((a, b) =>
        a.has_mined < b.has_mined
          ? 1
          : a.has_mined === b.has_mined
          ? a.lambda_coins < b.lambda_coins
            ? 1
            : a.has_rename < b.has_rename
            ? 1
            : -1
          : -1
      );
    } else {
      tempData.sort((a, b) => (a.key > b.key ? -1 : 1));
    }
    setAdvData(tempData);
  };

  const handleSorting = key => {
    if (key === sortColumn) {
      if (sortDir === "asc") {
        setSortDir("desc");
        sortList(key);
      } else {
        setSortDir("asc");
        sortList(key);
      }
    } else {
      setSortDir("asc");
      sortList(key);
    }
  };
  useEffect(() => {
    const loadStatus = async () => {
      const gameDump = await axios.get(url);
      const parsedArray = [];
      const playerList = Object.entries(gameDump.data.players);

      for (const [first, others] of playerList) {
        parsedArray.push({
          ID: first,
          real_name: others.real_name,
          name: others.name,
          has_rename: others.has_rename,
          has_mined: others.has_mined,
          gold: others.gold,
          lambda_coins: others.lambda_coins,
          room_id: others.room_id,
          can_fly: others.can_fly,
          can_dash: others.can_dash,
          can_carry: others.can_carry
        });
      }

      setAdvData(parsedArray);
      setReload(false);
      if (advData) {
        handleSorting(`gold`);
      }
    };
    loadStatus();
  }, [reload]);

  const handleListUpdate = () => {
    setReload(true);
  };
  return (
    <div>
      {!advData ? (
        <div className="loading">Loading data...</div>
      ) : (
        <Dashboard advData={advData} handleListUpdate={handleListUpdate} />
      )}
    </div>
  );
};

export default App;
