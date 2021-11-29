import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
import timeCon from "../images/timeCon.png";

export default function Legend() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }}>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Legend
          </Typography>

        </CardContent>

      </Box>

      <Box
                 sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
      >
      <CardMedia
        component="img"
        sx={{ width: 75, height:75}}
        image={sefmCon}
        alt="Live from space album cover"
      />
            <CardMedia
        component="img"
        sx={{ width: 75, height:75}}
        image={timeCon}
        alt="Live from space album cover"
      />
            <CardMedia
        component="img"
        sx={{ width: 75, height:75}}
        image={distanceCon}
        alt="Live from space album cover"
      />
    </Box>

    <Box
                 sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
      >
            <CardMedia
        component="img"
        sx={{ width: 75, height:75, }}
        image={cloudTempCon}
        alt="Live from space album cover"
      />
            <CardMedia
        component="img"
        sx={{ width: 75, height:75}}
        image={prepCon}
        alt="Live from space album cover"
      />
            <CardMedia
        component="img"
        sx={{ width: 75, height:75}}
        image={revCon}
        alt="Live from space album cover"
      />
    </Box>
    </Card>
  );
}