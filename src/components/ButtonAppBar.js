import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" position="static" sx={{ backgroundColor: '#123548'}} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

          <Link to="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Patch_of_the_Office_of_the_Chief_of_Space_Operations.png" alt="logo" width ='35' height='65'/>
          </Link>

          </Typography>


          <Link to="/" style={{ textDecoration: 'none', color: 'white'}}>
            <Button variant="contained" sx={{ backgroundColor: '#123540'}} > Home</Button>
          </Link>

          <Link to="/chart" style={{ textDecoration: 'none', color: 'white'}}>
            <Button variant="contained" sx={{ backgroundColor: '#123540'}} > Chart</Button>
          </Link>




        </Toolbar>
      </AppBar>
    </Box>
  );
}
