import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CustomizedDialogs from './CustomizedDialogs.js';

//generate criteria list from database, run criteria tests and build array of objects

let ruleSet = [
  {name: 'Lightning'},
  {name: 'Surface Electric Fields'},
  {name: 'Cumulus Clouds'},
  {name: 'Attached Anvil Clouds'},
  {name: 'Detached Anvil CLouds'},
  {name: 'Debris Clouds'},
  {name: 'Disturbed Weather'},
  {name: 'Thick Layer Clouds'},
  {name: 'Smoke Plumes'},
  {name: 'Triboelectrification'}
]

let gridFill = [];
for(let i = 0; i < ruleSet.length; i++) {
  gridFill.push(
    <Grid item xs={2} key={i}>
    <CustomizedDialogs ruleCriteria={ruleSet[i]}/>
  </Grid>
  )
}

for (let j = 0; j < ruleSet.length; j++) {
  ruleSet[j].status = 'Passed';
  ruleSet[j].dtg = Date();
  ruleSet[j].primeFactor = "Temperature";
  ruleSet[j].environData = [{name: "Cloud Temperature"}, {location: "GPS Coords"}, {eFieldStrength: 100}]
}




export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {gridFill}
      </Grid>
    </Box>
  );
}
