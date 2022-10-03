import React, { useState, useEffect } from "react";
import logo from "../assets/wf_logo.webp";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import {
  List,
  ListItem,
  Grid,
  Switch,
  TextField,
  InputAdornment,
  Button,
  Snackbar,
  IconButton,
  Slider,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function Header() {
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const [checked, setChecked] = useState(false);
  const [amount, setAmount] = useState(800000);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(30);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  let initialRender = React.useRef(0);
  useEffect(() => {
    if (initialRender.current > 1) {
      axios
        .post(`http://localhost:8091/v1/psrm/throttle?throttleValue=${checked}`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      initialRender.current += 1;
    }
  }, [checked]);
  let initialRender1 = React.useRef(0);
  useEffect(() => {
    if (initialRender1.current > 1) {
      axios
        .post(
          `http://localhost:8091/v1/psrm/throttleMaxAvailable?throttleMaxAvailable=${value}`
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      initialRender1.current += 1;
    }
  }, [value]);
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

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="topnav">
      <img src={logo} alt="Logo" />
      <span>
        | <b>POC</b> - Position Report
      </span>
      <a href="#logout">Logout</a>
      <a href="#logout" style={{ color: "#fcc60a", paddingRight: "5px" }}>
        | <i className="fa fa-sign-out"></i>
      </a>
      <a style={{marginRight:"-20px"}}
        className="hover-underline-animation" href="#throtllingRules"
        onClick={() => setState({ isPaneOpen: true })}
      >
        Throttling Rules
      </a>
      <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={state.isPaneOpen}
        title="Throttling Rules"
        width="600px"
        // subtitle="Optional subtitle."
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setState({ isPaneOpen: false });
        }}
      >
        <List>
          <h3 style={{marginTop:"-15px"}}> Fed Level </h3>
          <ListItem>
            <b className="customBold"> All Debit Transactions </b>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </ListItem>

          <h3> Miscellaneous </h3>
          <ListItem>
            <b className="customBold">Debit Amount ></b>&nbsp;&nbsp;
            <TextField
              // label="Amount"
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
              style={{ marginLeft: "5px" }}
              onClick={handleKeyDown}
              size="small"
              color="error"
            >
              Submit
            </Button>
          </ListItem>
          <br></br>
          <Divider />
          <br></br>
          <ListItem>
            <b className="customBold">
             Debit Amount &#62; X% of Max Available
            </b>
            &nbsp;&nbsp;
            <Slider
              sx={{ width: 150 }}
              aria-label="default"
              size="medium"
              value={value}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
            />
          </ListItem>
          <br></br>
          <Divider />
          <br></br>
          <ListItem>
            <b className="customBold">Beneficiary Bank</b>
            &nbsp;&nbsp;

            <TextField
              id="standard-basic"
              value="CITI"
              sx={{ width: "10ch" }}
              variant="standard"
              color="warning"
              focused
            />
            <Button
              variant="text"
              style={{ marginLeft: "5px" }}
              size="small"
              color="error"
            >
              Submit
            </Button>
          </ListItem>
          <br></br>
          <Divider />
          <br></br>
          <ListItem>
            <b className="customBold">Payment Rail</b>
            &nbsp;&nbsp;
            <TextField
              id="standard-basic"
              value="RTL"
              sx={{ width: "10ch" }}
              variant="standard"
              color="warning"
              focused

            />
            <Button
              variant="text"
              style={{ marginLeft: "5px" }}
              size="small"
              color="error"

            >
              Submit
            </Button>
          </ListItem>
          <br></br>
          <Divider />
        </List>
      </SlidingPane>
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

export default Header;
