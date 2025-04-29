import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
        </ThemeProvider>
  );
}

export default App;
