import React, { createContext,useEffect, useState, useRef } from "react";
import styles from './TypeResult.module.css';

export const TypingState = createContext();

const Typing = ({children}) => {
    const maxTime = 120;
    // const [timeLeft, setTimeLeft] = useState(maxTime);
    const [minutes, setMinutes] = useState(Math.floor(maxTime/60));
    const [seconds, setSeconds] = useState(maxTime % 60);
    const [mistakes, setMistakes] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [WPM, setWPM] = useState(0);
    const [CPM, setCPM] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const inputRef = useRef(null);
    const charRefs = useRef([]);
    const [correctWrong, setCorrectWrong] = useState([])

    useEffect(() => {
        inputRef.current.focus();
        setCorrectWrong(Array(charRefs.current.length).fill(''))
    },[])

    useEffect(() => {
        let interval;
        if(isTyping && (minutes > 0 || seconds > 0)){
            interval = setInterval(() => {
                if (seconds === 0 && minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    setSeconds(seconds - 1);
                }
            },1000);
        }else if(minutes === 0 && seconds === 0){
            clearInterval(interval);
            setIsTyping(false);

                let correctChars = charIndex - mistakes;
                let cpm = correctChars * (60 / maxTime);
                cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
                setCPM(parseInt(cpm,10));

                let wpm = Math.round((correctChars / 5 / maxTime)*60);
                wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
                setWPM(wpm);

                let accuracyPercentage = ((correctChars) / charIndex) * 100;
                accuracyPercentage = accuracyPercentage < 0 || !accuracyPercentage || accuracyPercentage === Infinity ? 0 : accuracyPercentage;
                setAccuracy(accuracyPercentage);
                // setResult(true);
        }
        return () => {
            clearInterval(interval);
        };
    },[isTyping, minutes, seconds]);

    const handleChange = (e) => {
        const characters = charRefs.current;
        let currentChar = charRefs.current[charIndex];
        let typedChar = e.target.value.slice(-1);
        if(charIndex < characters.length && (minutes > 0 || seconds > 0)){
            if(!isTyping){
                setIsTyping(true)
            }

            if(typedChar === currentChar.textContent){
                setCharIndex(charIndex + 1);
                correctWrong[charIndex] = styles.correct
            }else{
                setCharIndex(charIndex + 1);
                setMistakes(mistakes + 1);
                correctWrong[charIndex] = styles.wrong
            }

            if(charIndex === characters.length - 1) setIsTyping(false);
        }
        e.target.value = ''; 
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && charIndex > 0) {
            e.preventDefault(); // Prevent default backspace behavior
            const prevIndex = charIndex - 1;
            if (correctWrong[prevIndex] === styles.wrong) {
                setMistakes(prevMistakes => prevMistakes - 1);
            }
            setCharIndex(prevIndex);
            setCorrectWrong(prevState => {
                const newState = [...prevState];
                newState[prevIndex] = '';
                return newState;
            });
        }
    };

    const handleClick = () => {
        setCharIndex(charIndex);
        setIsTyping(true);
        inputRef.current.focus();
    };



    return (
    <TypingState.Provider value={{minutes,seconds,mistakes,charIndex,WPM,CPM,accuracy,inputRef,charRefs,correctWrong,handleChange,handleKeyDown,handleClick}}>
     {children}
    </TypingState.Provider>
  );
};

export default Typing;
