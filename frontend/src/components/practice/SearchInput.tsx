import React, { useContext, useState } from "react";
import { PracticeState } from "./PracticeLogic";
import { SearchOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SearchInput = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [promptResponses, setpromptResponses] = useState<string[]>([]);
  const context = useContext(PracticeState);
  const API_KEY = import.meta.env.VITE_API_KEY;
  if (!context) {
      throw new Error("SearchInput must be used within a PracticeState.Provider");
    }
    
  const {setTypingContent} = context;

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
    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <input
        type="text"
        value={searchInputValue}
        onChange={(e) => setSearchInputValue(e.target.value)}
      />
      <button
        type="submit"
        onClick={handleSearch}
      >
        <SearchOutlined />
      </button>
    </div>
  );
};

export default SearchInput;
