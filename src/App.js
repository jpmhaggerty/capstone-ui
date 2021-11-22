import * as React from "react";
import "./App.css";
import ButtonAppBar from "./components/ButtonAppBar.js";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RuleGeneric from "./components/RuleGeneric.js";

function App() {
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
    <React.Fragment>
      <header>
        <ButtonAppBar />
      </header>
      <div role="group">

        {/* <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {ruleList.map((element, index) => (
              <Grid key={index} item xs={2}>
                <RuleGeneric ruleName={element} />
              </Grid>
            ))}
          </Grid> */}

          <Box
        sx={{
          display: 'grid',
          columnGap: 2,
          rowGap: 2,
          gridTemplateColumns: 'repeat(5, 1fr)',
        }}
      >


      {ruleList.map((element, index) => (
              <Grid key={index}>
                <RuleGeneric ruleName={element} />
              </Grid>
            ))}
        </Box>


      </div>
    </React.Fragment>
  );
}

export default App;
