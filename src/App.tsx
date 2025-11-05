import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lightTheme } from "./config/theme";
import { initGA } from "./analytics";
import { useEffect } from "react";
import Home from "./pages/home";

function App() {
  let selectedTheme = lightTheme;
  const queryClient = new QueryClient();

  useEffect(() => {
    initGA();
  }, []);

  return (
    <ThemeProvider theme={selectedTheme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
