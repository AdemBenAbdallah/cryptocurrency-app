import React, { useState } from "react";
import { Stack, Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import { useGetCryptosQuery } from "../services/cryptoApi";
import "../App.css";
import Loader from "../Components/Loader";

export default function Exchanges() {
  const [dply, setDply] = useState(false);
  const { data, isFetching } = useGetCryptosQuery(10);

  console.log(data);
  if (isFetching) return <Loader />;
  return (
    <Stack direction="row">
      <Navbar />
      <Box flex={10} sx={{ padding: "12px", marginBottom: { xs: "57px" } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            background: "#2b2828eb",
            color: "white",
          }}
        >
          <p style={{ fontSize: "12px" }}>Exchanges</p>
          <p style={{ fontSize: "12px" }}>24h Trade Volume</p>
          <p style={{ fontSize: "12px" }}>Markets</p>
          <p style={{ fontSize: "12px" }}>Change</p>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            background: "#c8c8d78a",
            border: "1px solid #0000005e",
            cursor: "pointer",
          }}
          onClick={() => setDply(!dply)}
        >
          <p>1.Binance</p>
          <p>$22.45</p>
          <p>1.3$</p>
          <p>10.3%</p>
        </Box>
        <Box
          sx={{
            padding: "12px",
            borderBottom: "1px solid #0000005e",
            borderLeft: "1px solid #0000005e",
            borderRight: "1px solid #0000005e",
            display: dply ? "block" : "none",
          }}
        >
          <p className="parg">
            Binance is an online exchange where users can trade
            cryptocurrencies. It supports most commonly traded cryptocurrencies.
            Binance provides a crypto wallet for traders to store their
            electronic funds. The exchange also has supporting services for
            users to earn interest or transact using cryptocurrencies.
          </p>
        </Box>
      </Box>
    </Stack>
  );
}
