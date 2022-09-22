import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CreditDrillDown = (props) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Transaction No.</TableCell>
              <TableCell>Name of the Bank</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Rail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.credits
              .filter((row) => row.creditAmt > 1)
              .map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nm}</TableCell>
                  <TableCell>{row.creditAmt}</TableCell>
                  <TableCell>{row.timeStamp}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.pmtRail}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CreditDrillDown;
