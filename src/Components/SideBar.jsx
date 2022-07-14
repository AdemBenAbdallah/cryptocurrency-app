import { Box, styled } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "./Cards";
import CardsNews from "../Components/CardsNews";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import avatar from "../images/avatar-01.png";
import millify from "millify";
import moment from "moment";
import Loader from "./Loader";

export default function Home() {
  const Navigate = useNavigate();

  const StyledName = styled("p")({
    color: "gray",
    fontSize: "17px",
    margin: "0",
  });
  const StyledPrice = styled("p")({
    fontSize: "23px",
  });

  const { data, isFetching } = useGetCryptosQuery(10);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: 6,
  });

  const globalStats = data?.data?.stats;
  const cryptoList = data?.data?.coins;

  console.log(cryptoNews);

  if (isFetching) return <Loader />;
  if (!cryptoNews?.value) return <Loader />;

  return (
    <Box flex={10}>
      <p style={{ fontSize: "25px", padding: "12px", margin: "0" }}>
        Global News Cryptocurrencies
      </p>
      <Box
        sx={{
          padding: "19px",
          display: "flex",
          background: "#b5b0b01c",
          margin: "12px",
          borderRadius: "5px",
        }}
      >
        <div className="content">
          <div>
            <StyledName>Total Cryptocurrencies</StyledName>
            <StyledPrice>{globalStats.total}</StyledPrice>
          </div>
          <div>
            <StyledName>Totel Exchanges</StyledName>
            <StyledPrice>{millify(globalStats.totalExchanges)}</StyledPrice>
          </div>
        </div>
        <div className="content">
          <div>
            <StyledName>Total Market Cap</StyledName>
            <StyledPrice>{millify(globalStats.totalMarketCap)}</StyledPrice>
          </div>
          <div>
            <StyledName>Total 24h Volume</StyledName>
            <StyledPrice>{millify(globalStats.total24hVolume)}</StyledPrice>
          </div>
        </div>
      </Box>

      <Box sx={{ padding: "12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "25px" }}>Top 10 Crypto</p>
          <p
            style={{ color: "blue", fontSize: "20px", cursor: "pointer" }}
            onClick={() => Navigate("/Cryptocurrencies")}
          >
            Show More
          </p>
        </div>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {cryptoList.map((crypto) => (
            <Link
              to={`/crypto/${crypto.uuid}`}
              style={{ textDecoration: "none" }}
            >
              <Card
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

      <Box sx={{ padding: "12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "25px" }}>News</p>
          <p
            style={{ color: "blue", fontSize: "20px", cursor: "pointer" }}
            onClick={() => Navigate("/News")}
          >
            Show More
          </p>
        </div>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          {cryptoNews.value.map((news, i) => (
            <a
              href={news.url}
              target="_blank"
              rel="adem"
              style={{ textDecoration: "none" }}
            >
              <CardsNews
                img={news?.image?.thumbnail?.contentUrl || avatar}
                avatarImg={
                  news.provider[0]?.image?.thumbnail?.contentUrl || avatar
                }
                title={news.provider[0]?.name}
                parg={news.description}
                time={moment(news.datePublished).startOf("ss").fromNow()}
                key={i}
              />
            </a>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
