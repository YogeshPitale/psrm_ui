import "./App.css";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

function App() {
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
  useEffect(() => {
    const sse = new EventSource("http://localhost:8091/emitter");
    sse.onmessage = (e) => setData(JSON.parse(e.data));
    sse.onerror = () => {
      sse.close();
    };
  }, [data]);
  function myFormat(num) {
    if (num > 0) {
      return (num / Math.pow(10, num.toString().length - 1)).toFixed(2);
    } else {
      var n = -num;
      return -(n / Math.pow(10, n.toString().length - 1)).toFixed(2);
    }
  }
  let dollarUSLocale = Intl.NumberFormat("en-US");
  var test =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  return (
    <div className="App">
      <h2>Payments System Risk Monitor Position Report (in 1000's)</h2>
      <table className="styled-table">
        <tbody>
          <tr>
            <th>Current Position</th>
            <td>${dollarUSLocale.format(data.currentPosition)}</td>
          </tr>
          <tr>
            <th>Opening Balance (in 1000's)</th>
            <td>${dollarUSLocale.format(data.initialBalance)}</td>
          </tr>
          <tr>
            <th>Net Fedwire</th>
            <td>${myFormat(data.netFedWirePosition)}</td>
          </tr>
          <tr>
            <th>Fedwire Credits</th>
            <td>${myFormat(data.fedwireCredits)}</td>
          </tr>
          <tr>
            <th>Fedwire Debits</th>
            <td>${myFormat(data.fedwireDebits)}</td>
          </tr>
          <tr>
            <th>Cap</th>
            <td>${dollarUSLocale.format(data.cap)}</td>
          </tr>
          <tr>
            <th>Safety Factor</th>
            <td>${dollarUSLocale.format(data.safetyfactor)}</td>
          </tr>
          <tr>
            <th>Max Available</th>
            <td>${dollarUSLocale.format(data.maxAvailable)}</td>
          </tr>
          <tr>
            <th>Last Wire Received</th>
            <td>{data.timeStamp}</td>
          </tr>
          {/* <tr>
            <th>Last Wire Received</th>
            <td>
              <Tooltip title={test} placement="right">
                <Button
                  style={{
                    maxHeight: "15px",
                    color: "black",
                  }}
                >
                  ${dollarUSLocale.format(data.maxAvailable)}
                </Button>
              </Tooltip>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default App;
