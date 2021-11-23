import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RuleGeneric from "./RuleGeneric.js";


function Home() {
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
            mt: 4,
            ml: 4,
            mr:4
        }}>

        <Grid container spacing={3}>
          {ruleList.map((element, index) => (
                  <Grid item key={index} xs={12} md={6} lg={2.4} >
                    <RuleGeneric ruleName={element} />
                  </Grid>
                ))}
        </Grid>
      </Box>



  );
}

export default Home;