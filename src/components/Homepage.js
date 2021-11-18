import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import RuleGeneric from './RuleGeneric';

const baseURL = 'https://localhost:8080/rules';

const Homepage = () => {
  const [LCCs, setLCCs] = useState([
    {lightening: null},
    {cumulus: null},
    {attached: null},
    {detached: null},
    {debris: null},
    {sefm: null},
    {thick: null},
    {smoke: null},
    {tribo: null},
    {disturbed: null}
  ])

  async function apiCall(url) {
    const result = await fetch(baseURL + url);
    const data = await result.json();
    return data;
  }

  async function getLCC() {
    const lightningData = await apiCall('/lightning');
    setLCCs(...LLCs, {lightening: lightningData});

    let cumulusData = await apiCall('/cumulus');
    setLCCs(...LLCs, {cumulus: cumulusData});

    let attachedAnvData = await apiCall('/attached');
    setLCCs(...LLCs, {attached: attachedAnvData});

    let detachedAnvData = await apiCall('/detached');
    setLCCs(...LLCs, {detached: detachedAnvData});

    let debrisData = await apiCall('/debris');
    setLCCs(...LLCs, {debris: debrisData});

    let sefmData = await apiCall('/sefm');
    setLCCs(...LLCs, {sefm: sefmData});

    let thickData = await apiCall('/thick');
    setLCCs(...LLCs, {thick: thickData});

    let smokeData = await apiCall('/smoke');
    setLCCs(...LLCs, {smoke: smokeData});

    let triboData = await apiCall('/tribo');
    setLCCs(...LLCs, {tribo: triboData});

    let disturbedData = await apiCall('/disturbed');
    setLCCs(...LLCs, {disturbed: disturbedData});
  }

  useEffect(() => {
    getLCC();
  }, []);

  return (
    <Grid container>
      <h1>SLD 45 Weather Squadron Launch Commit Criteria</h1>
      <RuleGeneric criteria={LCCs} />
    </Grid>
  );

};

export default Homepage;