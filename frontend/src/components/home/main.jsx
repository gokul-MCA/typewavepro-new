import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import styles from "./Input.module.css";
import { useNavigate } from "react-router-dom";
import { SampleData } from "../../utils/data";

function GeminiInReact() {
  const [inputValue, setInputValue] = useState("");
  const [promptResponses, setpromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

  const genAI = new GoogleGenerativeAI(API_KEY);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
      const result = await model.generateContent(
        inputValue +
          "minimum 110 words in paragraph and not more than 120 words"
      );
      const response = result.response.text();
      setpromptResponses([...promptResponses, response]);
      localStorage.setItem("requestData", [...promptResponses, response]);
      setInputValue("");
      setLoading(false);
      localStorage.removeItem("myData");
    } catch (error) {
      console.log(error);
      console.log("Something Went Wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("myData", inputValue);
  }, [inputValue]);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.modalOverlay}>
          <span className={styles.loader}></span>
        </div>
      ) : (
        <div className={styles.form}>
          <div className={styles.inputFields}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter the Topic you choose"
              className={styles.formControl}
            />
            <button
              onClick={async () => {
                await getResponseForGivenPrompt();
                if (localStorage.getItem("requestData")) {
                  navigate("/typing");
                }
              }}
              className={styles.btn}
            >
              Go
            </button>
          </div>
        </div>
      )}
      <div className={styles.mainData}>
        {SampleData.map((item, id) => (
          <div key={id}>
            <input
              className={styles.btnData}
              type="button"
              value={item.value}
              onClick={() => setInputValue(item.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default GeminiInReact;
