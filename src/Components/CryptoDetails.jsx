import { Stack, Box } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import "../App.css";
import {
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useGetCryptosDetailsQuery } from "../services/cryptoApi";
import BarChart from "../Components/BarChart";
import millify from "millify";
import { CheckOutlined, StopOutlined } from "@mui/icons-material";
import HTMLReactParser from "html-react-parser";
import { useGetCryptoHistoryQuery } from "../services/cryptoApi";
import Loader from "./Loader";

export default function CryptoDetails() {
  const [timeperiod, setTimePeriod] = useState("7d");
  const { coinID } = useParams();
  const { data, isFetching } = useGetCryptosDetailsQuery(coinID);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinID,
    timeperiod,
  });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  console.log(timeperiod);

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <>
      <Stack direction="row">
        <Navbar />

        <Box flex={10}>
          <p
            style={{
              fontSize: "25px",
              padding: "12px",
              margin: "0",
              color: "blue",
            }}
          >
            {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
          </p>
          <p
            style={{
              fontSize: "14px",
              padding: "12px",
              color: "gray",
              margin: "0",
            }}
          >
            Bitcoin live pice View value statistics
          </p>
          <select
            className="select-year"
            onChange={(e) => setTimePeriod(e.target.value)}
            defaultValue="7d"
          >
            {time.map((item) => (
              <option key={item}>{item}</option>
            ))}
            <option>5y</option>
          </select>

          <BarChart
            coinHistory={coinHistory}
            currentPrice={millify(cryptoDetails?.price)}
            coinName={cryptoDetails?.name}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "space-around" },
              flexWrap: "wrap",
            }}
          >
            <div style={{ width: "300px" }}>
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "17px",
                    padding: "12px",
                    margin: "0",
                  }}
                >
                  {cryptoDetails.name} value statistics
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    padding: "0 12px",
                    color: "gray",
                    margin: "0",
                  }}
                >
                  An overview showing the statistics of {cryptoDetails.name},
                  such as the base and quote currency, the rank, and trading
                  volume.
                </p>
              </div>
              {stats.map(({ title, value, icon }) => (
                <div className="row">
                  <div>
                    {icon}
                    <span>{title}</span>
                  </div>
                  <p>{value}</p>
                </div>
              ))}
            </div>

            <div
              className="card-static"
              style={{ width: "300px", marginRight: "14px" }}
            >
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "17px",
                    padding: "12px",
                    margin: "0",
                  }}
                >
                  Other statistics info
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    padding: "0 12px",
                    color: "gray",
                    margin: "0",
                  }}
                >
                  An overview showing the statistics of {cryptoDetails.name},
                  such as the base and quote currency, the rank, and trading
                  volume.
                </p>
              </div>

              {genericStats.map(({ title, value, icon }) => (
                <div className="row">
                  <div>
                    {icon}
                    <span>{title}</span>
                  </div>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "space-between" },
              flexWrap: "wrap",
              marginTop: "23px",
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "45%" } }}>
              <Box>
                <p
                  style={{
                    fontSize: "19px",
                    padding: "12px",
                    margin: "0",
                    color: "blue",
                  }}
                >
                  What is {cryptoDetails.name} ?
                </p>
                <p
                  style={{
                    padding: "0 12px",
                    margin: "0",
                  }}
                >
                  {HTMLReactParser(cryptoDetails.description)}
                </p>
              </Box>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", sm: "45%" },
                marginTop: { xs: "34px" },
                marginLeft: "12px",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  padding: "12px 0",
                  margin: "0",
                  color: "blue",
                  fontWeight: "bold",
                }}
              >
                {cryptoDetails.name} Links
              </p>
              {cryptoDetails.links?.map((link) => (
                <a href={link.url} className="Links">
                  <span>{link.type}</span>
                  <p style={{ color: "#3d67b9" }}>{link.name}</p>
                </a>
              ))}
            </Box>
          </Box>
        </Box>
      </Stack>
    </>
  );
}
