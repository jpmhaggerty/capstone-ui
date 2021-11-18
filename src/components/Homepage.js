import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';

const baseURL = 'https://localhost:3000';

const Homepage = () => {
  const [LxCriteria, setLxCriteria] = useState(null);

  const apiCall = async (url) => {
    const result = await fetch(baseURL + url);
    const data = await result.json();
    return data;
};

  const getCriteria = async () => {
    const lightningData = await apiCall('/lightning');
    setLxCriteria(lightningData);

    let cumulusData = await apiCall('/cumulusCloud');
    setLxCriteria(lightningData);
  };

  useEffect(() => {
    getCriteria();
  }, []);

  return (
    <Grid container>
      <h1>SLD 45 Weather Squandron Launch Commit Criteria</h1>
    </Grid>
  );
};

export default Homepage;