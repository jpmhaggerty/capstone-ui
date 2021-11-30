import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RuleGeneric from "./RuleGeneric.js";
import Skeleton from "@mui/material/Skeleton";
import PropTypes from 'prop-types';
import Legend from "../components/Legend.js";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";





function Home() {

  //develop a function to determiner if the page is loading or not
  let loading = false;


  const ruleList = [
    "lightning",
    "sefm",
    "cumulus",
    "attached",
    "detached",
    "debris",
    "disturbed",
    "thick",
    "smoke",
    "tribo",
  ];


  // RuleGeneric.propTypes = {
  //   loading: PropTypes.bool,
  // };


  return (


        <Box
          data-testid='card-container'
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 12,
            ml: 4,
            mr:4
        }}>
{/*
          <Button size="small" onClick={() => handleModal()}> */}
          <Button>
            <IconButton aria-label="fill" sx={{ color: "#9e9e9e" }}>
              <CreateIcon />
            </IconButton>
          </Button>

        {/* CARDS */}
        <Grid container spacing={3}>
          {ruleList.map((element, index) => (
                  <Grid item key={index} xs={12} md={6} lg={2.4} >
                    <RuleGeneric ruleName={element} loading={loading}/>
                  </Grid>
                ))}
        </Grid>

      </Box>



  );
}

export default Home;