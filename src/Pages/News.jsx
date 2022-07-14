import { Stack, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "../App.css";
import CardsNews from "../Components/CardsNews";
import avatar from "../images/avatar-01.png";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import moment from "moment";
import Loader from "../Components/Loader";

export default function Home() {
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: 12,
  });

  if (!cryptoNews?.value) return <Loader />;
  return (
    <>
      <Stack direction="row">
        <Navbar />
        <Box flex={10} sx={{ marginBottom: { xs: "60px" } }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
              marginTop: "33px",
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
          </div>
        </Box>
      </Stack>
    </>
  );
}
