import { Box, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "../App.css";
import Cards from "../Components/Cards";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import millify from "millify";
import Loader from "../Components/Loader";

export default function Home() {
  const { data: crypto, isFetching } = useGetCryptosQuery(100);
  const [search, setSearch] = useState("");
  const [dataArr, setdataArr] = useState();

  useEffect(() => {
    setdataArr(crypto?.data?.coins);
    setdataArr(
      crypto?.data?.coins.filter((crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, crypto]);
  if (isFetching) return <Loader />;

  return (
    <>
      <Stack direction="row">
        <Navbar />
        <Box flex={10} sx={{ marginBottom: { xs: "57px" } }}>
          <Box
            sx={{
              margin: "25px auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              id="input"
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "35px",
              gap: "5px",
            }}
          >
            {dataArr?.map((crypto) => (
              <Link
                to={`/crypto/${crypto.uuid}`}
                style={{ textDecoration: "none" }}
              >
                <Cards
                  img={crypto.iconUrl}
                  name={crypto.name}
                  symbol={crypto.symbol}
                  price={millify(crypto.price)}
                  marketCap={millify(crypto.marketCap)}
                  change={millify(crypto.change)}
                  key={crypto.uuid}
                />
              </Link>
            ))}
          </Box>
        </Box>
      </Stack>
    </>
  );
}
