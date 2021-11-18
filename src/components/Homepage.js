import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';

const apiCall = async (url) => {
    const result = await fetch(baseURL + url);
    const data = await result.json();
    return data;
};

const Homepage = () => {
  const [LxCriteria, setLxCriteria] = useState(null);

  console.log(apiCall);
  const getLxCritera = async () => {
    let data = await apiCall('/lightning');
    setLxCriteria(data);
  };

  useEffect(() => {
    getLxCriteria();
  }, []);

  return (
    <Grid container>
      <h1>SLD 45 Weather Squandron Launch Commit Criteria</h1>
    </Grid>
  );
};

export default Homepage;