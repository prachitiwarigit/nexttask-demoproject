"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  InputAdornment,
  Avatar,
  TablePagination, // Import TablePagination
} from "@mui/material";
import { Search } from "@mui/icons-material";
import BusinessIcon from "@mui/icons-material/Business";

const ListCrypto = () => {
  const [data, setData] = useState(null);
  const [dataIcons, setDataIcons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkEmail, setcheckEmail] = useState("");
  const [page, setPage] = useState(0); // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page state


  useEffect(() => {
    fetchData();
    fetchDataIcons();
    if(typeof window !== 'undefined'){
      setcheckEmail(localStorage.getItem('userEmail'));
    }
  }, []);
  
  console.log("t",checkEmail)

  const fetchData = async () => {
    const url = "https://rest.coinapi.io/v1/exchanges";
    const headers = {
      Accept: "application/json",
      "X-CoinAPI-Key": "ba02b299-867a-4034-bee3-f03164738883", // Replace with your actual API key
    };

    try {
      const response = await fetch(url, { method: "GET", headers });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchDataIcons = async () => {
    const url = "https://rest.coinapi.io/v1/assets/icons/32";
    const headers = {
      Accept: "application/json",
      "X-CoinAPI-Key": "ba02b299-867a-4034-bee3-f03164738883", // Replace with your actual API key
    };

    try {
      const response = await fetch(url, { method: "GET", headers });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      setDataIcons(result);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const findIconForExchange = (exchangeId) => {
    const iconData = dataIcons.find((icon) => icon.asset_id === exchangeId);
    return iconData ? iconData.url : null;
  };

  const filteredData = data.filter(
    (exchange) =>
      exchange.name &&
      exchange.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update page state
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Update rows per page
    setPage(0); // Reset to the first page
  };

  if (!checkEmail) {
    return (
      <div>
        <h4 style={{textAlign:'center',marginTop:'40px'}}>Please log in to access this page.</h4>
        {/* You can add a login component or button here */}
      </div>
    );
  }

  return (
    <>
      <div>
        <h4 className="heading">Top crypto exchange</h4>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Find an exchange"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "300px",
            borderRadius: "25px",
          }}
          InputProps={{
            style: {
              borderRadius: "25px",
              marginTop: "50px",
            },
            startAdornment: (
              <InputAdornment position="start">
                <BusinessIcon style={{ color: "#6a6a6a" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Search style={{ color: "#6a6a6a" }} />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div style={{ maxWidth: "700px", margin: "auto", marginTop: "40px" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
                  <strong>Exchange</strong>
                </TableCell>
                <TableCell style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
                  <strong>Data Symbols Count</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginate data
                .map((exchange, index) => (
                  <TableRow key={index} sx={{ "&:hover": { backgroundColor: "#e0f7fa" } }}>
                    <TableCell style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {findIconForExchange(exchange.exchange_id) ? (
                        <Avatar
                          src={findIconForExchange(exchange.exchange_id)}
                          alt={exchange.name}
                        />
                      ) : (
                        <Typography variant="body2">No Icon</Typography>
                      )}
                      <div>
                        <Typography variant="body1" style={{ fontWeight: "bold" }}>
                          {exchange.name}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {exchange.data_symbols_count}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredData.length} 
          page={page} 
          onPageChange={handleChangePage} 
          rowsPerPage={rowsPerPage} 
          onRowsPerPageChange={handleChangeRowsPerPage} 
          rowsPerPageOptions={[10, 15, 25]} 
        />
      </div>
    </>
  );
};

export default ListCrypto;
