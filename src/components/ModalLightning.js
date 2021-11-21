import * as React from "react";
import { styled } from "@mui/material/styles";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import DateTimePicker from '@mui/lab/DateTimePicker';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PropTypes from "prop-types";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

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
  rule,
  ruleName,
  ruleSet,
  handleModal,
  handleDataSet,
}) {
  const properCase = (stringVal) => {
    return stringVal.slice(0, 1).toUpperCase() + stringVal.slice(1);
  };

  let ruleDialog = rule.map((element, index) => {
    if (element.constraint_parameter_boolean !== null) {
      return (
        <div key={index}>
          <Divider />
          <FormControlLabel
            label={element.constraint_name}
            control={
              <Checkbox
                checked={element.user_input_boolean}
                name="user_input_boolean"
                onChange={(event) =>
                  handleDataSet(index, event.target.name, event.target.checked)
                }
              />
            }
          />
        </div>
      );
    } else {
      if (
        element.constraint_name &&
        element.constraint_name.includes("distance")
      ) {
        return (
          <div key={index}>
            <Divider />
            <h3>{element.constraint_name}</h3>
            <TextField
              label="Enter distance"
              defaultValue={element.user_input_integer}
              name="user_input_integer"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">nm</InputAdornment>
                ),
              }}
              onChange={(event) =>
                handleDataSet(index, event.target.name, event.target.value)
              }
            />
          </div>
        );
      } else if (
        element.constraint_name &&
        element.constraint_name.includes("time")
      ) {
        return (
          <div key={index}>
            <Divider />
            <h3>{element.constraint_name}</h3>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DateTimePicker
                  label="Date & Time"
                  value={element.user_input_integer}
                  onChange={(event) => handleDataSet(index, "user_input_integer", event)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </div>
        );
      }
    }
  });

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
        {properCase(ruleName)} Rule
      </BootstrapDialogTitle>
      {ruleDialog}
    </BootstrapDialog>
  );
}
