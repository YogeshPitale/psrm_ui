import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import DebitDrillDown from "./DebitDrillDown";
import CreditDrillDown from "./CreditDrillDown";
import axios from "axios";

function MonitorTable(props) {
  const [trans, setTrans] = useState([]);

  const [isPaneOpen, setIsPaneOpen] = useState({
    ofCredits: false,
    ofDebits: false,
  });

  useEffect(() => {
    console.log("here");
    axios
      .get("http://localhost:8091/v1/psrm/risk-monitor")
      .then((res) => {
        console.log(res.data);
        setTrans(res.data);
      })
      .catch((err) => console.log(err));
  }, [props.data]);

  let dollarUSLocale = Intl.NumberFormat("en-US");

  return (
    <div>
      <table className="styled-table">
        <tbody>
          <tr>
            <th>Current Position</th>
            <td>
              <Button
                style={{
                  maxHeight: "15px",
                  color: "black",
                }}
              >
                ${dollarUSLocale.format(props.data.currentPosition)}
              </Button>
            </td>
          </tr>
          <tr>
            <th>Opening Balance (in 1000's)</th>
            <td>
              <Button
                style={{
                  maxHeight: "15px",
                  color: "black",
                }}
              >
                ${dollarUSLocale.format(props.data.initialBalance)}
              </Button>
            </td>
          </tr>
          <tr>
            <th>Net Fedwire</th>
            <td>
              <Tooltip title={props.ttData} placement="right">
                <Button
                  style={{
                    maxHeight: "15px",
                    color: "black",
                  }}
                >
                  ${dollarUSLocale.format(props.data.netFedWirePosition)}
                </Button>
              </Tooltip>
            </td>
          </tr>
          <tr>
            <th>
              <button onClick={() => setIsPaneOpen({ ofCredits: true })}>
                Fedwire Credits
              </button>
            </th>
            <td>
              <Button
                style={{
                  maxHeight: "15px",
                  color: "black",
                }}
              >
                ${dollarUSLocale.format(props.data.fedwireCredits)}
              </Button>
            </td>
          </tr>
          <tr>
            <th>
              <button onClick={() => setIsPaneOpen({ ofDebits: true })}>
                Fedwire Debits
              </button>
            </th>
            <td>
              <Button
                style={{
                  maxHeight: "15px",
                  color: "black",
                }}
              >
                ${dollarUSLocale.format(props.data.fedwireDebits)}
              </Button>
            </td>
          </tr>
          <tr>
            <th>Cap</th>
            <td>
              <Button
                style={{
                  maxHeight: "15px",
                  color: "black",
                }}
              >
                ${dollarUSLocale.format(props.data.cap)}
              </Button>
            </td>
          </tr>
          <tr>
            <th>Safety Factor</th>
            <td>
              <Button
                style={{
                  maxHeight: "15px",
                  color: "black",
                }}
              >
                ${dollarUSLocale.format(props.data.safetyfactor)}
              </Button>
            </td>
          </tr>
          <tr>
            <th>Max Available</th>
            <td>
              <Button
                style={{
                  maxHeight: "15px",
                  color: "black",
                }}
              >
                ${dollarUSLocale.format(props.data.maxAvailable)}
              </Button>
            </td>
          </tr>
          <tr>
            <th>Last Wire Received</th>
            <td>
              <Button
                style={{
                  maxHeight: "15px",
                  color: "black",
                }}
              >
                {props.data.timeStamp}
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={isPaneOpen.ofDebits}
        title="Debits Transactions"
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setIsPaneOpen({ ofDebits: false });
        }}
      >
        <DebitDrillDown debits={trans} />
      </SlidingPane>
      <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={isPaneOpen.ofCredits}
        title="Credits Transactions"
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setIsPaneOpen({ ofCredits: false });
        }}
      >
        <CreditDrillDown credits={trans} />
      </SlidingPane>
    </div>
  );
}

export default MonitorTable;
