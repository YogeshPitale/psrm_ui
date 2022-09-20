import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import axios from "axios";

// useEffect(() => {
//   CreditDrillDown();
// }, []);

const CreditDrillDown = () => {
  const { len } = useParams();
  const [credits, setCredits] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8091/v1/psrm/risk-monitor")
  //     .then((response) => response.json())
  //     .then((data) => setCredits(data));
  // }, [len]);

  useEffect(() => {
    const axiosPosts = async () => {
      const response = await axios(
        "http://localhost:8091/v1/psrm/risk-monitor"
      );
      setCredits(response.data);
      console.log(response.data);
    };
    axiosPosts();
  }, [len]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name of the Bank</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {credits.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nm}</TableCell>
                <TableCell>{row.fedwireCredits}</TableCell>
                <TableCell>{row.timeStamp}</TableCell>
                <TableCell>Released</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CreditDrillDown;
