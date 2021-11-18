import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function DateTime({dateTime, handleTimeChange }) {
  // const [value, setValue] = React.useState(new Date(dateTime));

  // const handleChange = (newValue) => {
  //   setValue(newValue);
  //   handleTimeChange(newValue);
  // };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          label="Date & Time"
          value={dateTime}
          onChange={handleTimeChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
