import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import DebitDrillDown from "./DebitDrillDown";
import CreditDrillDown from "./CreditDrillDown";
import axios from "axios";
import { InfoOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

function MonitorTable(props) {
  const [trans, setTrans] = useState([]);

  const [isPaneOpen, setIsPaneOpen] = useState({
    ofCredits: false,
    ofDebits: false,
  });

  useEffect(() => {
    if (props.data.initialBalance !== null && props.data.initialBalance !== 0)
      axios
        .get("http://localhost:8091/v1/psrm/risk-monitor")
        .then((res) => {
          // console.log(res.data);
          setTrans(res.data);
        })
        .catch((err) => console.log(err));
  }, [props.data]);

  let dollarUSLocale = Intl.NumberFormat("en-US");

  return (
    <div>
      <table className="styled-table">
        <tbody>
          <tr style={{ background: "#ccc", fontWeight: "bold" }}>
            <th style={{ color: "red", fontSize: "16px" }}>
              Current Position
              <Tooltip title="Opening Balance + Net Fedwire" placement="right">
                <IconButton
                  sx={{
                    fontSize: "13px",
                    padding: "0px",
                    marginLeft: "5px",
                  }}
                  color="error"
                >
                  <InfoOutlined fontSize="5px"></InfoOutlined>
                </IconButton>
              </Tooltip>
            </th>
            <td>
              <Button
                disabled={true}
                style={{
                  maxHeight: "15px",
                  color: "red",
                  fontSize: "16px",
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
                disabled={true}
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
            <th>
              Net Fedwire
              <Tooltip
                title="Fedwire Credits - Fedwire Debits"
                placement="right"
              >
                <IconButton
                  sx={{
                    fontSize: "13px",
                    padding: "0px",
                    marginLeft: "5px",
                  }}
                  color="error"
                >
                  <InfoOutlined fontSize="5px"></InfoOutlined>
                </IconButton>
              </Tooltip>
            </th>
            <td>
              <Tooltip
                title={
                  <div style={{ whiteSpace: "pre-line" }}>
                    {"No. of Messages: " +
                      props.len +
                      "\nPayment Rails : Wires"}
                  </div>
                }
                placement="right"
              >
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
                disabled={true}
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
                disabled={true}
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
                disabled={true}
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
            <th>
              Safety Factor
              <Tooltip title="10% of Cap" placement="right">
                <IconButton
                  sx={{
                    fontSize: "13px",
                    padding: "0px",
                    marginLeft: "5px",
                  }}
                  color="error"
                >
                  <InfoOutlined fontSize="5px"></InfoOutlined>
                </IconButton>
              </Tooltip>
            </th>
            <td>
              <Button
                disabled={true}
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
            <th>
              Max Available
              <Tooltip
                title="Current Position + Cap - Safety Factor"
                placement="right"
              >
                <IconButton
                  sx={{
                    fontSize: "13px",
                    padding: "0px",
                    marginLeft: "5px",
                  }}
                  color="error"
                >
                  <InfoOutlined fontSize="5px"></InfoOutlined>
                </IconButton>
              </Tooltip>
            </th>
            <td>
              <Button
                disabled={true}
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
                disabled={true}
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
        title="Debit Transactions"
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setIsPaneOpen({ ofDebits: false });
        }}
        closeIcon=<i
          className="fa fa-angle-right"
          style={{ fontSize: "36px" }}
        ></i>
      >
        <DebitDrillDown debits={trans} />
      </SlidingPane>
      <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={isPaneOpen.ofCredits}
        title="Credit Transactions"
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setIsPaneOpen({ ofCredits: false });
        }}
        closeIcon=<i
          className="fa fa-angle-right"
          style={{ fontSize: "36px" }}
        ></i>
      >
        <CreditDrillDown credits={trans} />
      </SlidingPane>
    </div>
  );
}

export default MonitorTable;
