import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DateTime from "./DateTime.js";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

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

export default function RuleLightning() {
  const infoFromDatabase = {
    ruleName: "lightning",
    llccFlightPathRadius: 10,
    llccStrikeTimeDelay: 30,
    llccMaxCloudDistToFlightPath: 10,
    strikeTime: Date.now() - 6 * 60 * 60 * 1000,
    strikeDistToFlightPath: 25,
    cloudDistToFlightPath: false,
    strikeDistNearFieldMill: false,
    fieldStrengthLow: false,
  };

  const [open, setOpen] = React.useState(false);
  const [ruleSet, setRuleSet] = React.useState(infoFromDatabase);
  const [clearToLaunch, setClearToLaunch] = React.useState(false);

  const properCase = (stringVal) => {
    return stringVal.slice(0, 1).toUpperCase() + stringVal.slice(1);
  };

  const handleModal = () => {
    setOpen(!open);
  };

  const handleTimeChange = (newTime) => {
    setRuleSet((ruleSet) => ({ ...ruleSet, strikeTime: newTime }));
  };

  const showByClass = (name, show) => {
    let classArray = document.getElementsByClassName(name);
    if (classArray) {
      for (let i = 0; i < classArray.length; i++) {
        classArray[i].removeAttribute("hidden");
      }
    }

    if (classArray && !show) {
      for (let i = 0; i < classArray.length; i++) {
        classArray[i].setAttribute("hidden", "true");
      }
    }
  };

  const handleCheck = (event) => {
    setRuleSet({
      ...ruleSet,
      [event.target.name]: event.target.checked,
    });
  };

  const { cloudDistToFlightPath, strikeDistNearFieldMill, fieldStrengthLow } =
    ruleSet;
  const error =
    [cloudDistToFlightPath, strikeDistNearFieldMill, fieldStrengthLow].filter(
      (v) => v
    ).length !== 2;

  React.useEffect(() => {
    const isRuleClear = () => {
      showByClass("exception", false);
      let rule1 = ruleSet.strikeDistToFlightPath > ruleSet.llccFlightPathRadius;
      let rule2 =
        (Date.now() - ruleSet.strikeTime) / (1000 * 60) >
        ruleSet.llccStrikeTimeDelay;
      let except1 =
        ruleSet.cloudDistToFlightPath &&
        ruleSet.strikeDistNearFieldMill &&
        ruleSet.fieldStrengthLow;

      showByClass("exception", !(rule1 || rule2));
      return rule1 || rule2 || except1;
    };

    setClearToLaunch(isRuleClear());
  }, [ruleSet]);

  return (
    <div>
      <Card
        sx={{ minWidth: 100, bgcolor: clearToLaunch ? "#D7FFD7" : "#FFD7D7" }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 28 }} color="text.primary" gutterBottom>
            {properCase(ruleSet.ruleName)} Rule
          </Typography>
          <Typography variant="h5" component="div">
            {clearToLaunch ? "Clear" : "Violation"}
          </Typography>
          <CardMedia
            component="img"
            height="194"
            image="https://cdn.mos.cms.futurecdn.net/3nBMpxAkg5sAuHY8uaHy3B-1024-80.jpg"
            alt=""
          />
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Strike distance to flight path: {ruleSet.strikeDistToFlightPath}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Time of last strike: {(ruleSet.strikeTime ?? false) ? Date(ruleSet.strikeTime) : "N/A"}
          </Typography>
          {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Expected time of clearance: {(ruleSet.strikeTime)} Add 30 mins
          </Typography> */}
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleModal()}>
            Change Environmental Data
          </Button>
        </CardActions>
      </Card>
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
                    checked={cloudDistToFlightPath}
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
                    checked={strikeDistNearFieldMill}
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
                    checked={fieldStrengthLow}
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
    </div>
  );
}
