import * as React from "react";
import "./App.css";
import ButtonAppBar from "./components/ButtonAppBar.js";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RuleGeneric from "./components/RuleGeneric.js";
import RuleLightning from "./components/RuleLightning.js";

function App() {
  return (
    <div>
      <header>
        <ButtonAppBar />
      </header>
      <body>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <RuleLightning />
            </Grid>
            <Grid item xs={2}>
              <RuleGeneric />
            </Grid>
            <Grid item xs={2}>
              <RuleGeneric />
            </Grid>
            <Grid item xs={2}>
              <RuleGeneric />
            </Grid>
            <Grid item xs={2}>
              <RuleGeneric />
            </Grid>
            <Grid item xs={2}>
              <RuleGeneric />
            </Grid>
            <Grid item xs={2}>
              <RuleGeneric />
            </Grid>
            <Grid item xs={2}>
              <RuleGeneric />
            </Grid>
            <Grid item xs={2}>
              <RuleGeneric />
            </Grid>
            <Grid item xs={2}>
              <RuleGeneric />
            </Grid>
          </Grid>
        </Box>
      </body>
    </div>
  );
}

export default App;
