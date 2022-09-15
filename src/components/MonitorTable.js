import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

function MonitorTable(props) {
  function myFormat(num) {
    if (num > 0) {
      return (num / Math.pow(10, num.toString().length - 1)).toFixed(2);
    } else {
      var n = -num;
      return -(n / Math.pow(10, n.toString().length - 1)).toFixed(2);
    }
  }

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
                    paddingLeft: "0px",
                    color: "black",
                  }}
                >
                  ${myFormat(props.data.netFedWirePosition)}
                </Button>
              </Tooltip>
            </td>
          </tr>
          <tr>
            <th>Fedwire Credits</th>
            <td>
              <Button
                style={{
                  maxHeight: "15px",
                  paddingLeft: "0px",
                  color: "black",
                }}
              >
                ${myFormat(props.data.fedwireCredits)}
              </Button>
            </td>
          </tr>
          <tr>
            <th>Fedwire Debits</th>
            <td>
              <Button
                style={{
                  maxHeight: "15px",
                  paddingLeft: "0px",
                  color: "black",
                }}
              >
                ${myFormat(props.data.fedwireDebits)}
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
    </div>
  );
}

export default MonitorTable;
