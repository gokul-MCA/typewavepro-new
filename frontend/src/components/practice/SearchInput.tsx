import React, { useContext, useState } from "react";
import { PracticeState } from "./PracticeLogic";
import { SearchOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IconButton, InputBase, Paper } from "@mui/material";
import { SearchIcon } from "lucide-react";

const SearchInput = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [promptResponses, setpromptResponses] = useState<string[]>([]);
  const context = useContext(PracticeState);
  const API_KEY = import.meta.env.VITE_API_KEY;
  if (!context) {
    throw new Error("SearchInput must be used within a PracticeState.Provider");
  }

  const { setTypingContent } = context;

  const genAI = new GoogleGenerativeAI(API_KEY);
  const getResponseForGivenPrompt = async () => {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-lite",
      });
      const result = await model.generateContent(
        searchInputValue +
          "minimum 110 words in paragraph and not more than 120 words"
      );
      const response = result.response.text();

      const updatedResponses = [...promptResponses, response];
      setpromptResponses(updatedResponses);
      sessionStorage.setItem("requestData", JSON.stringify(updatedResponses));

      // Optionally update typingContent in context
      //   if (context?.setTypingContent) {
      //     context.setTypingContent(response);
      //   }
      context.setTypingContent(response);
    } catch (error) {
      console.error("Failed to fetch AI response:", error);
    }
  };

  const handleSearch = async () => {
    await getResponseForGivenPrompt();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 350,
            bgcolor: "#1f2023",
            borderRadius: 6,
          }}
        >
          <InputBase
            sx={{
              ml: 2,
              flex: 1,
              color: "white", // input text
              "& input::placeholder": {
                color: "grey", // placeholder text
                opacity: 1, // ensure it's visible
              },
            }}
            placeholder="Enter the topic you want to practice"
            inputProps={{
              "aria-label": "Enter the topic you want to practice",
            }}
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
          <IconButton
            type="button"
            sx={{ p: "10px", color: "white", backgroundColor: "" }}
            aria-label="search"
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    </>
  );
};

export default SearchInput;
