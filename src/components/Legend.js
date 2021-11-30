import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import cloudTempCon from "../images/cloudTempCon.png";
import distanceCon from "../images/distanceCon.png";
import prepCon from "../images/prepCon.png";
import revCon from "../images/revCon.png";
import sefmCon from "../images/sefmCon.png";
import timeCon from "../images/timeCon.png"
import Grid from "@mui/material/Grid";

export default function Legend() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', maxWidth: 1500 }}>

      <Box sx={{ display: 'flex', flexDirection: 'row', bgcolor : "#2196f3" }}>
        <CardContent >
          <Typography component="div" variant="h5">
            Legend
          </Typography>

        </CardContent>
      </Box>

      <Grid>
      <Box
       sx={{
            display: "flex",
            flexDirection: "row",
            margin: 2,
            bgcolor : "#f50057",
           }}
           display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}
      >
              <Box>
                <CardMedia
                  component="img"
                  sx={{ width: 75, height:75}}
                  image={sefmCon}
                  alt="sefm"
                />



                {/* <Typography> Surface Electrical Field</Typography> */}


                      <CardMedia
                  component="img"
                  sx={{ width: 75, height:75}}
                  image={timeCon}
                  alt="Time"
                />


                {/* <Typography> Time</Typography> */}


                      <CardMedia
                  component="img"
                  sx={{ width: 75, height:75}}
                  image={distanceCon}
                  alt="Distance"
                />
                  </Box>

                {/* <Typography> Distance </Typography> */}

                  <Box>
                      <CardMedia
                  component="img"
                  sx={{ width: 75, height:75, }}
                  image={cloudTempCon}
                  alt="temp"
                />


                {/* <Typography> Cloud Temperature </Typography> */}


                      <CardMedia
                  component="img"
                  sx={{ width: 75, height:75}}
                  image={prepCon}
                  alt="prep"
                />



                {/* <Typography> Precipitation Intensity </Typography> */}


                      <CardMedia
                  component="img"
                  sx={{ width: 75, height:75}}
                  image={revCon}
                  alt="rev"
                />
                </Box>

                {/* <Typography> Rocket Velocity </Typography> */}

      </Box>
</Grid>

    </Card>
  );
}