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

export default function CustomizedDialogs({ ruleCriteria }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

    let diagContent = ruleCriteria.environData.map((element, index) => (
      <Typography gutterBottom>
        <span>{Object.keys(element)[0].toUpperCase()}</span>
      <TextField
        required
        key={index}
        label="Required"
        defaultValue="Enter a value"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
    </Typography>

    ))


  return (
    <div>
      <BasicCard ruleCriteria={ruleCriteria} handleClickOpen={handleClickOpen} />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {ruleCriteria.name}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {diagContent}
          {/* <Typography gutterBottom>
            <TextField
              required
              id="rule1-criterion1"
              label="Required"
              defaultValue="Hello World"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </Typography>
          <Typography gutterBottom>
            <TextField
              required
              id="rule1-criterion2"
              label="Required"
              defaultValue="Hello World"
            />
          </Typography>
          <Typography gutterBottom>
            <TextField
              required
              id="rule1-criterion3"
              label="Required"
              defaultValue="Hello World"
            />
          </Typography> */}

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
