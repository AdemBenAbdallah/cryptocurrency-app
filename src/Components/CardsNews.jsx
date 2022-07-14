import {
  Box,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

import "../App.css";

export default function Home({ img, avatarImg, title, parg, time }) {
  return (
    <Card sx={{ width: "300px" }}>
      <Box sx={{ display: "flex" }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {parg.length > 100 ? `${parg.substring(0, 100)}...` : parg}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="20%"
          image={img}
          sx={{ width: "100px", height: "100px" }}
          alt="Paella dish"
        />
      </Box>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "blue" }}
            src={avatarImg}
            aria-label="recipe"
          />
        }
        title={title}
        subheader={time}
      />
    </Card>
  );
}
