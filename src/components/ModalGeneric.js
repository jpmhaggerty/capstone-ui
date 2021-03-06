import * as React from "react";
import { styled } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

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

export default function ModalGeneric({
  openModal,
  openProMode,
  properRuleName,
  ruleName,
  rule,
  handleModal,
  handleProMode,
  handleDataSet,
}) {
  let ruleDialog = rule.map((element, index) => {
    if (element.constraint_parameter_boolean !== null) {
      return (
        <div key={index} className={element.logic_group.split(",").slice(-1)}>
          <Divider />
          <Stack
            direction="row"
            spacing={1}
            alignItems="left"
            divider={<Divider orientation="vertical" flexItem />}
          >
            {/* TWO */}
            <Box>
              <TextField
                label="ID"
                defaultValue={element.id}
                fullWidth
                sx={{
                  color: "blue",
                  width: "58px",
                  padding: "5px",
                  margin: "5px",
                }}
                size="extra-small"
              />
            </Box>
            <FormControlLabel
              data-testid={`constraint_name${index}`}
              label={element.constraint_name}
              control={
                <div>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography sx={{ padding: "0px 0px 0px 20px" }}>
                      No
                    </Typography>
                    <Switch
                      checked={element.user_input_boolean}
                      name="user_input_boolean"
                      color="success"
                      onChange={(event) =>
                        handleDataSet(
                          index,
                          event.target.name,
                          event.target.checked
                        )
                      }
                    />
                    <Typography sx={{ padding: "0px 20px 0px 0px" }}>
                      Yes
                    </Typography>
                  </Stack>
                </div>
              }
            />
          </Stack>
        </div>
      );
    } else if (
      element.constraint_name &&
      element.constraint_name.includes("distance")
    ) {
      return (
        // THREE
        <div key={index} className={element.logic_group.split(",").slice(-1)}>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: 2,
            }}
          >
            <Box>
              <TextField
                label="ID"
                defaultValue={element.id}
                sx={{
                  color: "blue",
                  width: "58px",
                  padding: "5px",
                  margin: "5px",
                }}
                size="small"
              />
            </Box>

            {/* <Divider orientation="vertical" /> */}

            <Box sx={{ ml: 4 }}>
              <h3>{element.constraint_name}</h3>
            </Box>

            {/* DISTANCE INPUT */}

            <Box sx={{ ml: 3, my:1 }}>
              <TextField
                label="Enter distance"
                defaultValue={element.user_input_integer}
                name="user_input_integer"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">nm</InputAdornment>
                  ),
                }}
                sx={{
                  width: "125px",
                }}
                onChange={(event) =>
                  handleDataSet(index, event.target.name, event.target.value)
                }
                size="small"
              />
            </Box>
          </Box>
        </div>
      );
    } else if (
      element.constraint_name &&
      element.constraint_name.includes("time")
    ) {
      return (
        <div key={index} className={element.logic_group.split(",").slice(-1)}>
          <Divider />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  mt: 2,
                }}
              >
                <Box>
                  <TextField
                    label="ID"
                    defaultValue={element.id}
                    sx={{
                      color: "blue",
                      width: "58px",
                      padding: "5px",
                      margin: "5px",
                    }}
                    size="small"
                  />
                </Box>
                <Box sx={{ ml: 5 }}>
                  <h3>{element.constraint_name}</h3>
                </Box>

                {/* DATE PICKER */}

                <Box sx={{ width: "180px", ml: 3 }}>
                  <DateTimePicker
                    label="Date & Time"
                    value={+element.user_input_integer}
                    openTo="hours"
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(event) =>
                      handleDataSet(
                        index,
                        "user_input_integer",
                        Date.parse(event)
                      )
                    }
                  />
                </Box>
              </Box>
            </Stack>
          </LocalizationProvider>
        </div>
      );
    }
  });

  let ruleDialogPro = rule.map((element, index) => {
    if (element.constraint_parameter_boolean !== null) {
      return (
        <div key={index}>
          <Divider />
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label="ID"
              defaultValue={element.id}
              sx={{
                color: "blue",
                width: "158px",
                padding: "10px",
                margin: "5px",
              }}
              size="small"
            />

            {/* NO */}

            <TextField
              data-testid={`constraint_rule${index}`}
              label="Constraint Rule"
              multiline
              fullWidth
              defaultValue={element.constraint_name}
              sx={{
                color: "blue",
                bgcolor: "orange",
                padding: "10px",
                margin: "10px",
              }}
              size="small"
              name={`constraint_name`}
              onChange={(event) =>
                handleDataSet(index, event.target.name, event.target.value)
              }
            />
            <FormControlLabel
              label=""
              labelPlacement="top"
              sx={{ color: "blue", bgcolor: "orange" }}
              control={
                <div>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography sx={{ padding: "0px 0px 0px 20px" }}>
                      No
                    </Typography>
                    <Switch
                      checked={element.constraint_parameter_boolean}
                      name="constraint_parameter_boolean"
                      color="success"
                      onChange={(event) =>
                        handleDataSet(
                          index,
                          event.target.name,
                          event.target.checked
                        )
                      }
                    />
                    <Typography sx={{ padding: "0px 20px 0px 0px" }}>
                      Yes
                    </Typography>
                  </Stack>
                </div>
              }
            />
            {/* <TextField
              data-testid='logicGroup'
              label="Logic Group"
              multiline
              width="auto"
              defaultValue={element.logic_group}
              sx={{ color: "blue", bgcolor: "orange" }}
              size="small"
              name="logic_group"
              onChange={(event) =>
                handleDataSet(index, event.target.name, event.target.value)
              }
            /> */}
          </Stack>
        </div>
      );
    } else {
      return (
        <div key={index}>
          <Divider />
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label="ID"
              defaultValue={element.id}
              sx={{
                color: "blue",
                width: "150px",
                padding: "10px",
                margin: "5px",
              }}
              size="small"
            />

            {/* NO */}

            <TextField
              label="Constraint Rule"
              multiline
              fullWidth
              defaultValue={element.constraint_name}
              sx={{
                color: "blue",
                bgcolor: "orange",
                padding: "10px",
                margin: "10px",
              }}
              size="small"
              name="constraint_name"
              onChange={(event) =>
                handleDataSet(index, event.target.name, event.target.value)
              }
            />
            <TextField
              label="Operator"
              defaultValue={element.constraint_operator}
              select
              sx={{ color: "blue", bgcolor: "orange", width: "125px" }}
              size="small"
              name="constraint_operator"
              onChange={(event) =>
                handleDataSet(index, event.target.name, event.target.value)
              }
            >
              <MenuItem value={"==="}>=</MenuItem>
              <MenuItem value={">"}>&gt;</MenuItem>
              <MenuItem value={">="}>&gt;=</MenuItem>
              <MenuItem value={"<"}>&lt;</MenuItem>
              <MenuItem value={"<="}>&lt;=</MenuItem>
            </TextField>
            <TextField
              label="Value"
              multiline
              defaultValue={element.constraint_parameter_integer}
              sx={{ color: "blue", bgcolor: "orange", width: "125px" }}
              size="small"
              name="constraint_parameter_integer"
              onChange={(event) =>
                handleDataSet(index, event.target.name, event.target.value)
              }
            />
            {/* <TextField
              label="Logic Group"
              multiline
              width="auto"
              defaultValue={element.logic_group}
              sx={{ color: "blue", bgcolor: "orange" }}
              size="small"
              name="logic_group"
              onChange={(event) =>
                handleDataSet(index, event.target.name, event.target.value)
              }
            /> */}
          </Stack>
        </div>
      );
    }
  });

  return (
    <BootstrapDialog
      onClose={handleModal}
      aria-labelledby="customized-dialog-title"
      open={openModal}
      fullWidth="true"
      maxWidth="xl"
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={handleModal}
        sx={{ minWidth: 1000, bgcolor: "#3e5f6b", color: "white" }}
      >
        {properRuleName} Rule
      </BootstrapDialogTitle>
      {openProMode ? ruleDialogPro : ruleDialog}
      <br></br>
      <Button size="small" onClick={handleModal}>
        Submit
      </Button>
      <Typography align="right">
        <FormControlLabel
          label={"Edit Rule"}
          labelPlacement="top"
          control={
            <div>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography sx={{ padding: "0px 0px 0px 20px" }}>
                  Locked
                </Typography>
                <Switch
                  data-testid="proModeSwitch"
                  name="pro_mode"
                  color="warning"
                  size="small"
                  onClick={handleProMode}
                />
                <Typography sx={{ padding: "0px 20px 0px 0px" }}>
                  Edit
                </Typography>
              </Stack>
            </div>
          }
        />
      </Typography>
    </BootstrapDialog>
  );
}
