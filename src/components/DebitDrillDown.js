import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const DebitDrillDown = () => {
  const [debits, setDebits] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8091/v1/psrm/risk-monitor")
  //     .then((response) => response.json())
  //     .then((data) => setDebits(data));
  // }, []);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    await axios
      .get("http://localhost:8091/v1/psrm/risk-monitor")
      .then((res) => {
        setIsLoading(true);
        setDebits(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {isLoading ? console.log(true) : console.log(false)}
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
            {debits.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nm}</TableCell>
                <TableCell>{row.fedwireDebits}</TableCell>
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

export default DebitDrillDown;
