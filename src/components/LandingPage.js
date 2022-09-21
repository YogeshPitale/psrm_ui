import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MonitorTable from "./MonitorTable";
import DynamicLineChart from "./DynamicLineChart";
import axios from "axios";

function LandingPage() {
  const [data, setData] = useState({
    currentPosition: 0,
    initialBalance: 0,
    netFedWirePosition: 0,
    fedwireCredits: 0,
    fedwireDebits: 0,
    cap: 0,
    safetyfactor: 0,
    maxAvailable: 0,
  });

  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    const sse = new EventSource("http://localhost:8091/emitter");
    function getRealTimeData(parsedData) {
      setData(parsedData);
    }
    sse.onmessage = (e) => getRealTimeData(JSON.parse(e.data));
    sse.onerror = () => {
      sse.close();
    };
  }, [data]);

  useEffect(() => {
    if (data.initialBalance !== null && data.initialBalance !== 0) {
      let d = new Date(data.timeStamp);
      let [h, m, s] = [d.getHours(), d.getMinutes(), d.getSeconds()];
      setDataPoints((prevData) => [
        ...prevData,
        {
          x: [h, m, s].join(":"),
          y: data.currentPosition,
        },
      ]);
    }
  }, [data]);

  const [onHoldCount, setOnHoldCount] = useState(0);
  useEffect(() => {
    fetch("http://localhost:8091/v1/psrm/count")
      .then((res) => res.json())
      .then((json) => {
        setOnHoldCount(json);
      });
  }, [data]);

  var ttData = (
    <div style={{ whiteSpace: "pre-line" }}>
      {"No. of Messages: " + dataPoints.length + "\nPayment Rails : Wires"}
    </div>
  );

  return (
    <div className="App">
      <h2>Payments System Risk Monitor Position Report (in 1000's)</h2>

      <Grid container>
        <Grid item xs={5} style={{ marginRight: "-1px" }}>
          <MonitorTable data={data} ttData={ttData} len={dataPoints.length} />
        </Grid>
        <Grid item xs={7} style={{ marginTop: "20px" }}>
          <b
            style={{
              color: "#cd1409",
            }}
          >
            On Hold Count : {onHoldCount}
          </b>
          <DynamicLineChart dataPoints={dataPoints} />
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;
