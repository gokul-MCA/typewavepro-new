import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./pages/Home.jsx";
import Test from "./pages/Test.jsx";
import "./App.css";
import New from "./pages/New.tsx";
import Practice from "./components/practice/Practice.tsx";
import PracticeLogic from "./components/practice/PracticeLogic.tsx";
import Result from "./components/practice/Result.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import { blue, grey, pink } from "@mui/material/colors";

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        localStorage.setItem("hasVisited", "true");
      }, 5000); // Simulate a 3 second loading time
    } else {
      setLoading(false);
    }
  }, []);

  function NoFound() {
    return <h2>404 - Page Not Found</h2>;
  }
  function LoadCycle() {
    return (
      <div className="prev">
        <h1>
          Hi, <span>Welcome to TypeWave Pro!</span>
        </h1>
        <p className="loader"></p>
      </div>
    );
  }

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff", //white
      },
      secondary: {
        main: "#000", //black
      },
      error: {
        main: "#c2185b", //pink
      },
      warning: {
        main: "#ff1744", //red
      },
      info: {
        main: "#2196f3", // blue
      },
      success: {
        main: "#d500f9", //purple
      },
    },
  });

  return (
    <div>
      {loading ? (
        <LoadCycle />
      ) : (
        <ThemeProvider theme={darkTheme}>
          <BrowserRouter>
            <Routes>
              <Route index element={<New />} />
              <Route path="*" element={<NoFound />} />

              <Route path="/practice" element={<PracticeLogic />}>
                <Route index element={<Practice />} />
                <Route path="result" element={<Result />} />
              </Route>

              <Route path="/dashboard" element={<Dashboard/> }>
                <Route path="static-content-practice" element={<Result />} />
                <Route path="dynamic-content-practice" element={<Result />} />

              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      )}
    </div>
  );
};

export default App;
