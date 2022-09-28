import React, { useState, useEffect } from "react";
import MonitorTable from "./MonitorTable";
import DynamicLineChart from "./DynamicLineChart";
import CloseIcon from "@mui/icons-material/Close";
import {
  Grid,
  Switch,
  TextField,
  InputAdornment,
  Button,
  Snackbar,
  IconButton,
} from "@mui/material";
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
  const [onHoldCount, setOnHoldCount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [amount, setAmount] = useState(800000);
  const [open, setOpen] = React.useState(false);

  let initialRender2 = React.useRef(false);
  useEffect(() => {
    if (initialRender2.current) {
      const sse = new EventSource("http://localhost:8091/emitter");
      function getRealTimeData(parsedData) {
        setData(parsedData);
      }
      sse.onmessage = (e) => getRealTimeData(JSON.parse(e.data));
      sse.onerror = () => {
        sse.close();
      };
    }
    return () => {
      initialRender2.current = true;
    };
  }, []);

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

  useEffect(() => {
    if (data.initialBalance !== null && data.initialBalance !== 0)
      fetch("http://localhost:8091/v1/psrm/count")
        .then((res) => res.json())
        .then((json) => {
          setOnHoldCount(json);
        });
  }, [data]);

  let initialRender = React.useRef(0);
  useEffect(() => {
    if (initialRender.current > 1) {
      axios
        .post(`http://localhost:8091/v1/psrm/throttle?throttleValue=${checked}`)
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      initialRender.current += 1;
    }
  }, [checked]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleKeyDown = () => {
    axios
      .post(`http://localhost:8091/v1/psrm/amount?amount=${amount}`)
      .then(function (response) {
        // console.log(response);
        handleClick();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="App">
      <h2>Payments System Risk Monitor Position Report (in 1000's)</h2>

      <Grid container>
        <Grid item xs={5} style={{ marginRight: "-1px" }}>
          <MonitorTable data={data} len={dataPoints.length} />
        </Grid>
        <Grid item xs={7} style={{ marginTop: "20px", paddingTop: "6px" }}>
          <Grid container spacing={0}>
            <Grid item xs>
              <p
                style={{
                  marginTop: "-5px",
                  paddingBottom: "20px",
                  paddingTop: "6px",
                }}
              >
                <b>Transactions On Hold : {onHoldCount}</b>
              </p>
            </Grid>
            <Grid
              item
              xs
              style={{
                marginTop: "-7px",
                textAlign: "center",
              }}
            >
              <span>
                <b>Throttle</b>
              </span>
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Grid>
            <Grid
              item
              xs
              style={{
                marginTop: "-20px",
              }}
            >
              <TextField
                label="Rule"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                sx={{ width: "10ch" }}
                variant="standard"
                color="warning"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                focused
              />
              <Button
                variant="text"
                style={{ marginTop: "17px", marginLeft: "5px" }}
                onClick={handleKeyDown}
                size="small"
                color="error"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          <DynamicLineChart dataPoints={dataPoints} />
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={`Rule Updated to ${amount}`}
        action={action}
      />
    </div>
  );
}

export default LandingPage;
