import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const DebitDrillDown = (props) => {
  const [isSort, setIsSort] = useState(false);
  function Chapters({ value }) {
    const chapters = value.split(",");

    return (
      <List disablePadding dense>
        {chapters.map((chapter, i) => (
          <ListItem key={i}>{chapter}</ListItem>
        ))}
      </List>
    );
  }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Transaction No.</TableCell>
              <TableCell>Name of the Bank</TableCell>
              <TableCell>Payment Rail</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>
                Status{" "}
                <button onClick={() => setIsSort(!isSort)}>
                  <i
                    className="fa fa-arrow-down"
                    style={{ color: isSort && "#cd1409" }}
                  ></i>
                </button>
              </TableCell>
              <TableCell>Reson For Hold</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {!isSort && (
            <TableBody>
              {[...props.debits]
                .filter((row) => row.debitAmt > 1)
                .map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.nm}</TableCell>
                    <TableCell>{row.pmtRail}</TableCell>
                    <TableCell>{row.debitAmt}</TableCell>
                    <TableCell>{row.timeStamp}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      {row.reasonForHold != null && (
                        <Chapters value={row.reasonForHold.slice(1, -1)} />
                      )}
                    </TableCell>
                    <TableCell>
                      {row.status === "On Hold" && (
                        <button className="button">Investigate</button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
          {isSort && (
            <TableBody>
              {[...props.debits]
                .sort((a, b) => a.status.localeCompare(b.status))
                .filter((row) => row.debitAmt > 1)
                .map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.nm}</TableCell>
                    <TableCell>{row.pmtRail}</TableCell>
                    <TableCell>{row.debitAmt}</TableCell>
                    <TableCell>{row.timeStamp}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      {row.reasonForHold != null && (
                        <Chapters value={row.reasonForHold.slice(1, -1)} />
                      )}
                    </TableCell>
                    <TableCell>
                      {row.status === "On Hold" && (
                        <button className="button">Investigate</button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default DebitDrillDown;
