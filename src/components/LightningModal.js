import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DateTime from "./DateTime.js";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

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


export default function LightningModal({infoFromDatabase, handleModal}) {

  const [open, setOpen] = React.useState(false);
  const [ruleSet, setRuleSet] = React.useState(infoFromDatabase);
  const [clearToLaunch, setClearToLaunch] = React.useState(false);

  const handleTimeChange = (newTime) => {
    setRuleSet((ruleSet) => ({ ...ruleSet, strikeTime: newTime }));
  };

  // const handleModal = () => {
  //   setOpen(!open);
  // };

  const handleCheck = (event) => {
    setRuleSet({
      ...ruleSet,
      [event.target.name]: event.target.checked,
    });
  };

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
      <div id="dist-to-fp">
        <h3>Distance of lightning to flight path: </h3>
        <TextField
          required
          id="dist-to-fp-reply"
          label="Distance (Nautical Miles)"
          defaultValue={ruleSet.strikeDistToFlightPath}
          InputProps={{
            endAdornment: <InputAdornment position="end">nm</InputAdornment>,
          }}
          onChange={(event) =>
            setRuleSet({
              ...ruleSet,
              strikeDistToFlightPath: event.target.value,
            })
          }
        />
      </div>
      <div id="strike-time">
        <h3>Time of last close strike: </h3>
        <DateTime
          dateTime={ruleSet.strikeTime}
          handleTimeChange={handleTimeChange}
        />
      </div>
      <div className="exception" hidden>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Rule Exceptions</FormLabel>
          <FormGroup>
            <Divider />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ruleSet.cloudDistToFlightPath}
                  onChange={handleCheck}
                  name="cloudDistToFlightPath"
                />
              }
              label="Is the non-transparent part of the cloud that produced the lightning
  at a slant distance of greater than 10 nmi from the flight path?"
            />
            <Divider />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ruleSet.strikeDistNearFieldMill}
                  onChange={handleCheck}
                  name="strikeDistNearFieldMill"
                />
              }
              label="Is there at least one working field mill within a horizontal
  distance of less than or equal to 5 nmi from lightning discharge?"
            />
            <Divider />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ruleSet.fieldStrengthLow}
                  onChange={handleCheck}
                  name="fieldStrengthLow"
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
