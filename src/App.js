import * as React from "react";
import ButtonAppBar from "./components/ButtonAppBar.js";
import CssBaseline from '@mui/material/CssBaseline';
import Home from "./components/Home.js";
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useState} from 'react';
import { Routes, Route} from "react-router-dom";


function App() {

  const [darkMode, setDarkMode] = useState();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    }
  })

  return (
    <React.Fragment>
    <ThemeProvider theme={theme}>
      <CssBaseline>

      <header>
        <ButtonAppBar darkMode={darkMode} setDarkMode={setDarkMode}/>
      </header>

      <Routes>
        <Route path="/" element={<Home/>} darkMode={darkMode} setDarkMode={setDarkMode}/>
      </Routes>

      </CssBaseline>
    </ThemeProvider>

    </React.Fragment>
  );
}

export default App;
