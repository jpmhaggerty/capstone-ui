import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";

import cloudTempCon from "../images/cloudTempCon.png";
import distanceCon from "../images/distanceCon.png";
import prepCon from "../images/prepCon.png";
import revCon from "../images/revCon.png";
import sefmCon from "../images/sefmCon.png";
import timeCon from "../images/timeCon.png";

export default function Legend() {
  return (
    <Box sx={{ mt: 10 }}>
      <Card sx={{ maxWidth: 390, bgcolor: "#e0e0e0" }}>
        <Grid>
          <Box sx={{ bgcolor: "#123540", color: grey[50] }}>
            <Typography
              component="div"
              variant="h5"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              Legend
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              margin: 2,
            }}
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={2}
          >
            <Box>
              <CardMedia
                component="img"
                sx={{ width: 75, height: 75, mb: 1 }}
                image={sefmCon}
                alt="sefm"
              />

              <CardMedia
                component="img"
                sx={{ width: 75, height: 75, mb: 1 }}
                image={timeCon}
                alt="Time"
              />

              <CardMedia
                component="img"
                sx={{ width: 75, height: 75, mb: 1 }}
                image={distanceCon}
                alt="Distance"
              />
            </Box>

            <Box sx={{ color: "#212121" }}>
              <Box sx={{ width: 75, height: 75, mb: 1 }}>
                <Typography> Surface Electrical Field</Typography>
              </Box>

              <Box sx={{ width: 75, height: 75, mb: 1 }}>
                <Typography> Time</Typography>
              </Box>

              <Box sx={{ width: 75, height: 75, mb: 1 }}>
                <Typography> Distance </Typography>
              </Box>
            </Box>

            <Box>
              <CardMedia
                component="img"
                sx={{ width: 75, height: 75, mb: 1 }}
                image={cloudTempCon}
                alt="temp"
              />

              <CardMedia
                component="img"
                sx={{ width: 75, height: 75, mb: 1 }}
                image={prepCon}
                alt="prep"
              />

              <CardMedia
                component="img"
                sx={{ width: 75, height: 75, mb: 1 }}
                image={revCon}
                alt="rev"
              />
            </Box>

            <Box sx={{ color: "#212121" }}>
              <Box sx={{ width: 75, height: 75, mb: 1 }}>
                <Typography> Cloud Temperature </Typography>
              </Box>

              <Box sx={{ width: 75, height: 75, mb: 1 }}>
                <Typography> Precipitation Intensity</Typography>
              </Box>

              <Box sx={{ width: 75, height: 75, mb: 1 }}>
                <Typography> Rocket Velocity</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Card>
    </Box>
  );
}
