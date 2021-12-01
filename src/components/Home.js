import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RuleGeneric from "./RuleGeneric.js";
import Skeleton from "@mui/material/Skeleton";
import PropTypes from 'prop-types';
import Legend from "../components/Legend.js";
import Button from "@mui/material/Button";
import ReportIcon from '@mui/icons-material/Report';
import IconButton from "@mui/material/IconButton";
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: 425,
  bgcolor: 'background.paper',
  border: '4px solid  #123540',
  boxShadow: 24,

};





function Home() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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



    <body>


          <Button onClick={handleOpen}>
            <IconButton aria-label="fill" sx={{ color: "#9e9e9e" }}>
              <Tooltip title={<Typography fontSize={18}>Legend</Typography>}>
                  <ReportIcon/>
              </Tooltip>
            </IconButton>
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">

        <Box sx={style}>
          <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",

                  }}>
            <Legend/>
          </Box>
        </Box>

          </Modal>



        <Box
          data-testid='card-container'
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            ml: 4,
            mr:4
        }}>


        {/* CARDS */}
        <Grid container spacing={3}>
          {ruleList.map((element, index) => (
                  <Grid item key={index} xs={12} md={6} lg={2.4} >
                    <RuleGeneric ruleName={element} loading={loading}/>
                  </Grid>
                ))}
        </Grid>

      </Box>

    </body>



  );
}

export default Home;