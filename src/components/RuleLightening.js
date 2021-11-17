import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import BasicCard from "./BasicCard.js";
import TextField from "@mui/material/TextField";
import DateTime from "./DateTime.js";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

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

export default function RuleLightening() {
  const infoFromDatabase = {
    ruleName: "lightning",
    clearToLaunch: false,
    llccFlightPathRadius: 10,
    llccStrikeTimeDelay: 30,
    strikeDistToFlightPath: 0,
    llccMaxCloudDistToFlightPath: 10,
    cloudDistToFlightPath: 0,
    strikeTime: Date(),
    // llccMinStrikeDistToClosestFieldMill: 2,
    // strikeDistToClosestFieldMill: 0,
    strikeDistNearFieldMill: false,
    // llccMaxAreaFieldStrength: 1000,
    // maxAreaFieldStrength: 1000,
    // llccMinLowFieldStrengthTime: 15,
    // lowFieldStrengthTime: 0,
    fieldStrengthLow: false,
  };

  const [open, setOpen] = React.useState(false);
  const [ruleSet, setRuleSet] = React.useState(infoFromDatabase);

  const properCase = (stringVal) => {
    return stringVal.slice(0, 1).toUpperCase() + stringVal.slice(1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTimeChange = (newTime) => {
    setRuleSet({ ...ruleSet, strikeTime: newTime });
    console.log(
      "Time delta: ",
      (Date.now() - ruleSet.strikeTime) / (1000 * 60)
    );
    checkForClearance();
  };

  const checkForClearance = () => {
    setRuleSet({ ...ruleSet, clearToLaunch: false });
    if (
      ruleSet.strikeDistToFlightPath > ruleSet.llccFlightPathRadius &&
      (Date.now() - ruleSet.strikeTime) / (1000 * 60) >
        ruleSet.llccStrikeTimeDelay
    ) {
      setRuleSet({ ...ruleSet, clearToLaunch: true });
    } else {
      if (
        ruleSet.cloudDistToFlightPath > ruleSet.llccMaxCloudDistToFlightPath &&
        ruleSet.strikeDistNearFieldMill &&
        ruleSet.fieldStrengthLow
      ) {
        setRuleSet({ ...ruleSet, clearToLaunch: true });
      }
    }
  };

  return (
    <div>
      <Card
        sx={{ minWidth: 275, bgcolor: ruleSet.clearToLaunch ? "green" : "red" }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            {properCase(ruleSet.ruleName)} Rule
          </Typography>
          <Typography variant="h5" component="div">
            {ruleSet.clearToLaunch ? "Clear" : "Violation"}
          </Typography>
          <CardMedia
            component="img"
            height="194"
            image="https://cdn.mos.cms.futurecdn.net/3nBMpxAkg5sAuHY8uaHy3B-1024-80.jpg"
            alt=""
          />
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Placeholder
          </Typography>
          <Typography variant="body2">Placeholder</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleClickOpen()}>
            Change Environmental Data
          </Button>
        </CardActions>
      </Card>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {properCase(ruleSet.ruleName)} Rule
        </BootstrapDialogTitle>
        <div id="dist-to-fp">
          <h3>Distance of lightning to flight path: </h3>
          <TextField
            required
            id="dist-to-fp-reply"
            label="Required"
            defaultValue="10"
            InputProps={{
              endAdornment: <InputAdornment position="end">nm</InputAdornment>,
            }}
            onChange={(event) => {
              setRuleSet({
                ...ruleSet,
                strikeDistToFlightPath: event.target.value,
              });
              checkForClearance();
            }}
          />
        </div>
        <div id="strike-time">
          <h3>Time of last strike: </h3>
          <DateTime handleTimeChange={handleTimeChange} />
        </div>
        <div id="dist-to-cloud">
          <h3>
            Is the cloud which produced the lightning within 10 nm of the flight
            path?{" "}
          </h3>
          <RadioGroup
            id="dist-to-cloud-reply"
            defaultValue="first"
            onChange={(event) => {
              setRuleSet({
                ...ruleSet,
                cloudDistToFlightPath: event.target.value,
              });
              checkForClearance();
            }}
          >
            <FormControlLabel value="true" label="Yes" control={<Radio />} />
            <FormControlLabel value="false" label="No" control={<Radio />} />
          </RadioGroup>
        </div>
        <div id="close-fm">
          <h3>Is a working field mill within 5 nm of the lightning strike? </h3>
          <RadioGroup
            id="close-fm-reply"
            defaultValue="first"
            onChange={(event) => {
              setRuleSet({
                ...ruleSet,
                strikeDistNearFieldMill: event.target.value,
              });
              checkForClearance();
            }}
          >
            <FormControlLabel value="true" label="Yes" control={<Radio />} />
            <FormControlLabel value="false" label="No" control={<Radio />} />
          </RadioGroup>
        </div>
        <div id="low-em-field">
          <h3>
            Highest absolute value of any field mill within 5 nm of flight path
            or lightning strike within last 15 minutes:{" "}
          </h3>
          <RadioGroup
            id="low-em-field-reply"
            defaultValue="first"
            onChange={(event) => {
              setRuleSet({
                ...ruleSet,
                fieldStrengthLow: event.target.value,
              });
              checkForClearance();
            }}
          >
            <FormControlLabel value="true" label="Yes" control={<Radio />} />
            <FormControlLabel value="false" label="No" control={<Radio />} />
          </RadioGroup>
        </div>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
