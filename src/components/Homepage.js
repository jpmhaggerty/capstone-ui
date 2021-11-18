import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';

const baseURL = 'https://localhost:3000';

const Homepage = () => {
  const [LxCriteria, setLxCriteria] = useState(null);
  const [cumulusCriteria, setCumulusCriteria] = useState(null);
  const [attachedAnvCriteria, setAttachedAnvCriteria] = useState(null);
  const [detachedAnvCriteria, setDetachedAnvCriteria] = useState(null);
  const [debrisCriteria, setDebirsCriteria] = useState(null);
  const [sefmCriteria, setSEFMCriteria] = useState(null);
  const [thickCriteria, setThickCriteria] = useState(null);
  const [smokeCriteria, setSmokeCriteria] = useState(null);
  const [triboCriteria, setTriboCriteria] = useState(null);
  const [disturbedWxCriteria, setDisturbedWxCriteria] = useState(null);

  const apiCall = async (url) => {
    const result = await fetch(baseURL + url);
    const data = await result.json();
    return data;
};

  const getCriteria = async () => {
    const lightningData = await apiCall('/lightning');
    setLxCriteria(lightningData);

    let cumulusData = await apiCall('/cumulus_cloud');
    setLxCriteria(cumulusData);

    let attachedAnvData = await apiCall('/attached_anvil_cloud');
    setAttachedAnvCriteria(attachedAnvData);

    let detachedAnvData = await apiCall('/detached_anvil_cloud');
    setDetachedAnvCriteria(detachedAnvData);

    let debrisData = await apiCall('/debris_cloud');
    setDebrisCriteria(debrisData);

    let sefmData = await apiCall('/sefm');
    setSEFMCriteria(sefmData);

    let thickData = await apiCall('/thick_cloud');
    setThickCriteria(thickData);

    let smokeData = await apiCall('/smoke_cloud');
    setSmokeCriteria(smokeData);

    let triboData = await apiCall('/triboelctrification');
    setTriboCriteria(triboData);

    let disturbedData = await apiCall('/disturbed_wx');
    setDisturbedWxCriteria(disturbedData);
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