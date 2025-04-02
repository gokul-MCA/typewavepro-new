import React, { useEffect, useState, useRef } from "react";
// import './style.css'
import { HiOutlineRefresh } from "react-icons/hi";
import { HiOutlineHome } from "react-icons/hi2";

const paragraph =
  "Python is a high-level, versatile programming language known for its readability and efficiency. It is widely used for web development, data analysis, artificial intelligence, automation, and more. One of the key reasons for Python's popularity is its extensive standard library, which provides ready-to-use modules and packages for various tasks. Python supports multiple programming paradigms, including procedural, object-oriented, and functional programming, making it suitable for different types of projects. Its dynamic typing and easy syntax make it a favorite among beginners and experienced developers alike. Python's community is vibrant and supportive, with numerous resources available for learning and problem-solving. Whether you are a beginner or an expert, Python has something to offer for everyone.";    
const Typing = () => {

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
                correctWrong[charIndex] = 'correct'
            }else{
                setCharIndex(charIndex + 1);
                setMistakes(mistakes + 1);
                correctWrong[charIndex] = 'wrong'
            }

            if(charIndex === characters.length - 1) setIsTyping(false);
        }
        e.target.value = ''; 
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && charIndex > 0) {
            e.preventDefault(); // Prevent default backspace behavior
            const prevIndex = charIndex - 1;
            if (correctWrong[prevIndex] === 'wrong') {
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
    <>
    {(minutes !== 0 || seconds !== 0) ? (
    <div className="container">
      <div className="result">
        <p>Time Left: <strong className={`${minutes || seconds > 10 ? "green":"red"} space`}>{`${minutes}:${seconds.toString().padStart(2, '0')}`}</strong></p>
        <p>Mistakes: <strong style={{color:mistakes > 10 ?"red":""}}>{mistakes}</strong></p>
      </div>

      <div className="test">
        <input type="text" className="input-field" ref={inputRef} onChange={handleChange} onKeyDown={handleKeyDown} />
        {paragraph.split("").map((char,index) => (
            <span 
            key={index} 
            className={`char ${index === charIndex ? 'active': ''} ${correctWrong[index]}`} 
            ref={(e) => (charRefs.current[index] = e)} 
            onClick={() => handleClick(index)}
            >
                {char}
            </span>
        ))
        }
      </div>

      <span className="last">
      <HiOutlineHome style={{height:"20px"}}/>
      <HiOutlineRefresh className='refresh' onClick = {() => window.location.reload()} style={{height:"20px"}}/>
      </span>

    </div>
    ) :
       
        // {(minutes === 0 && seconds === 0) && (
        (
        <div className="popup">
            <p className="para">Accuracy: <strong>{accuracy.toFixed(2)}%</strong></p>
            {accuracy > 95 ? (
                        <i className="e">Good Keep it up!</i>
                    ) : accuracy > 80 ? (
                        <i className="g">Keep Practicing!</i>
                    ) : (
                        <i className="f">First Focus on Accuracy!</i>
                    )}
             <p className="para">WPM: <strong>{WPM}</strong></p>
             {WPM >= 50 ? (
                <i className="e">You're Athlete!</i>
                ): WPM >= 40 ? (
                <i className="g">Sportsman!</i>
                 ) : (
                <i className="f">Normal Man?</i>
                 )}
             <p className="para">CPM: <strong>{CPM}</strong></p>
             <p className="para">You're 
             {accuracy > 95 && WPM >= 50 ? (
                        <b className="e"> Senior Typist!</b>
                    ) : accuracy > 80 && WPM >= 40 ? (
                        <b className="g"> Junior Typist!</b>
                    ) : (
                        <b className="f"> Beginner!</b>
                    )}</p>
               <HiOutlineRefresh className='refresh' onClick = {() => window.location.reload()} style={{height:"20px"}}/>
        </div>
        )}
    </>
  );
};

export default Typing;
