import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  ShareLocation,
} from "@mui/icons-material";
import {
  Card,
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

export default function Cards({ img, name, symbol, price, marketCap, change }) {
  return (
    <div>
      <Card sx={{ margin: "3px", width: "300px" }}>
        <CardHeader
          avatar={<Avatar aria-label="recipe" src={img} />}
          title={name}
          subheader={symbol}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <p>Price: {price}</p>
            <p>Market Cap: {marketCap}</p>
            <p>Daily Change: {change}%</p>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
