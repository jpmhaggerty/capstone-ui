import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from '@mui/material/CardMedia';

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard({ ruleCriteria, handleClickOpen }) {
  return (
    <Card sx={{ minWidth: 400 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {ruleCriteria.name}
        </Typography>
        <Typography variant="h5" component="div">
          {bull}
          {ruleCriteria.status}
        </Typography>
        <CardMedia
          component="img"
          height="194"
          image="https://cdn.mos.cms.futurecdn.net/3nBMpxAkg5sAuHY8uaHy3B-1024-80.jpg"
          alt=""
        />
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {ruleCriteria.dtg}
        </Typography>
        <Typography variant="body2">
          {ruleCriteria.primeFactor}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleClickOpen()}>
          Change Environmental Data
        </Button>
      </CardActions>
    </Card>
  );
}
