import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import HomeLayout from "./layout/HomeLayout.tsx";
import Home from "./pages/home/Home.tsx";
import DynamicContentPage from "./pages/dynamic-content/DynamicContentPage.tsx";

import PracticeLogic from "./components/practice/PracticeLogic.tsx";
import Practice from "./components/practice/Practice.tsx";
import LoginPractice from "./components/practice/LoginPractice.tsx";
import PracticeSessionWrapper from "./components/practice/PracticeSessionWrapper.tsx";

import Result from "./components/result/Result.tsx";
import LoginResult from "./components/result/LoginResult.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import { blue, grey, pink } from "@mui/material/colors";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

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

  const getUser = async() => {
    try{
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const {data} = await axios.get(url,{withCredentials:true});
      setUser(data.user._json);
    }catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  },[])

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
              <Route path="*" element={<NoFound />} />

              <Route path="/" element={<HomeLayout />}>
                <Route index element={<Home />} />
              </Route>

              {/* Practice Routes */}
              <Route path="/practice" element={<PracticeLogic />}>
                  <Route index element={<Practice />} />
                  <Route path="result" element={<Result />} />
              </Route>

                {/* Dashboard Routes */}
                <Route path="/dashboard">
                  <Route index element={<Dashboard />} />
                  {/* <Route index element={user ? <Dashboard /> : <Navigate to='/login'/>} /> */}
                  <Route path="static-content-practice/:sessionId" element={<PracticeSessionWrapper />}>
                    <Route index element={<LoginPractice />} />
                    <Route path="result" element={<LoginResult />} />
                  </Route>
                  <Route path="dynamic-content-practice/:sessionId" element={<PracticeSessionWrapper />}>
                    <Route index element={<DynamicContentPage/>} />
                    {/* <Route index element={<SearchInput />} /> */}
                    {/* <Route path="practice" element={<LoginPractice />} /> */}
                    <Route path="result" element={<LoginResult />} />
                  </Route>
                </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      )}
    </div>
  );
};

export default App;
