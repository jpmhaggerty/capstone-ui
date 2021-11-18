import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import DateTime from "./DateTime.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = ({ children, onClose, ...other }) => {
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ModalLightning({
  open,
  ruleSet,
  handleModal,
  handleDataSet,
}) {
  const handleTimeChange = (newTime) => {
    handleDataSet("strikeTime", newTime);
  };

  // const showByClass = (name, show) => {
  //   let classArray = document.getElementsByClassName(name);
  //   if (classArray) {
  //     for (let i = 0; i < classArray.length; i++) {
  //       classArray[i].removeAttribute("hidden");
  //     }
  //   }
  //   if (classArray && !show) {
  //     for (let i = 0; i < classArray.length; i++) {
  //       classArray[i].setAttribute("hidden", "true");
  //     }
  //   }
  // };

  const properCase = (stringVal) => {
    return stringVal.slice(0, 1).toUpperCase() + stringVal.slice(1);
  };

  return (
    <BootstrapDialog
      onClose={handleModal}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={handleModal}
        sx={{ minWidth: 400 }}
      >
        {properCase(ruleSet.ruleName)} Rule
      </BootstrapDialogTitle>
      <div>
        <h3>Distance of lightning to flight path: </h3>
        <TextField
          name="strikeDistToFlightPath"
          label="Distance (Nautical Miles)"
          defaultValue={ruleSet.strikeDistToFlightPath}
          InputProps={{
            endAdornment: <InputAdornment position="end">nm</InputAdornment>,
          }}
          onChange={(event) =>
            handleDataSet(event.target.name, event.target.value)
          }
        />
      </div>
      <div>
        <h3>Time of last close strike: </h3>
        <DateTime
          dateTime={ruleSet.strikeTime}
          handleTimeChange={handleTimeChange}
        />
      </div>
      <div className="exception">
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Rule Exceptions</FormLabel>
          <FormGroup>
            <Divider />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={ruleSet.cloudDistToFlightPath}
                  name="cloudDistToFlightPath"
                  onChange={(event) =>
                    handleDataSet(event.target.name, event.target.checked)
                  }
                />
              }
              label="Is the non-transparent part of the cloud that produced the lightning
  at a slant distance of greater than 10 nmi from the flight path?"
            />
            <Divider />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={ruleSet.strikeDistNearFieldMill}
                  name="strikeDistNearFieldMill"
                  onChange={(event) =>
                    handleDataSet(event.target.name, event.target.checked)
                  }
                />
              }
              label="Is there at least one working field mill within a horizontal
  distance of less than or equal to 5 nmi from lightning discharge?"
            />
            <Divider />
            <FormControlLabel
              control={
                <Checkbox
                  // checked={ruleSet.fieldStrengthLow}
                  name="fieldStrengthLow"
                  onChange={(event) =>
                    handleDataSet(event.target.name, event.target.checked)
                  }
                />
              }
              label="Have the absolute values of all electric field measurements within a
  horizontal distance of less than or equal to 5 nmi from the flight
  and discharge paths been less than 1000 V/m for at least 15 minutes?"
            />
          </FormGroup>
        </FormControl>
      </div>
      <DialogActions>
        <Button autoFocus onClick={handleModal}>
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
