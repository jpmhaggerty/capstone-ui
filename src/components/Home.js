import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RuleGeneric from "./RuleGeneric.js";
import Skeleton from "@mui/material/Skeleton";





function Home(props) {

  const { loading = false } = props;


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





  return (

        <Box sx={{
            display: "flex",
            justifyContent: "center",
            mt: 12,
            ml: 4,
            mr:4
        }}>

        <Grid container spacing={3}>
          {!loading && ruleList.map((element, index) => (
                  <Grid item key={index} xs={12} md={6} lg={2.4} >
                    <RuleGeneric ruleName={element} loading />
                  </Grid>
                ))}


                    {loading && ruleList.map(index => (
                            <Grid item key={index} xs={12} md={6} lg={2.4} >
                                <Grid width={200}>
                                  <Skeleton variant="rect" width={210} height={210} />
                                  <Box pt={0.5} height={52}>
                                    <Skeleton />
                                    <Skeleton width={60} />
                                  </Box>
                                </Grid>
                              </Grid>
                            ))}
        </Grid>
      </Box>



  );
}

export default Home;