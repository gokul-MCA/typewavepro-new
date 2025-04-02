import React, { useContext, useEffect, useState} from "react";
import styles from './TypeResult.module.css'
import Typing,{ TypingState } from "./PreTyping";
import { Home, Refresh } from "./RefreshHome"


function Result (){
    const {minutes,seconds,mistakes,charIndex,WPM,CPM,accuracy,inputRef,charRefs,correctWrong,handleChange,handleKeyDown,handleClick} = useContext(TypingState);
    const paragraph = localStorage.getItem("requestData");
    
    useEffect(() => {
        if (charRefs.current[charIndex]) {
            charRefs.current[charIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [charIndex]);


    return (
    <>
    {(minutes !== 0 || seconds !== 0) ? (
    <div className={styles.container}>
      <div className={styles.result}>
        <p>Time Left: <strong className={`${minutes || seconds > 10 ? styles.green:styles.red} space`}>{`${minutes}:${seconds.toString().padStart(2, '0')}`}</strong></p>
        <p>Mistakes: <strong style={{color:mistakes > 10 ? "red" : ''}}>{mistakes}</strong></p>
      </div>

      <div className={styles.test}>
        <input type="text" className={styles.inputField} ref={inputRef} onChange={handleChange} onKeyDown={handleKeyDown} />
        {paragraph.split("").map((char,index) => (
            <span 
            key={index} 
            className={`char ${index === charIndex ? styles.active: ''} ${correctWrong[index]}`} 
            ref={(e) => (charRefs.current[index] = e)} 
            onClick={() => handleClick(index)}
            >
                {char}
            </span>
        ))
        }
      </div>

      <span className={styles.last}>
        <Home/><Refresh/>
      </span>

    </div>
    ) : (
        <div className={styles.popup}>
            <p className={styles.para}>Accuracy: <strong>{accuracy.toFixed(2)}%</strong></p>
            {accuracy > 95 ? (
                        <i className = {styles.e}>Good Keep it up!</i>
                    ) : accuracy > 80 ? (
                        <i className = {styles.g}>Keep Practicing!</i>
                    ) : (
                        <i className = {styles.f}>First Focus on Accuracy!</i>
                    )}
             <p className={styles.para}>Word Per Minute: <strong>{WPM}</strong></p>
             {WPM >= 50 ? (
                <i className = {styles.e}>You're Athlete!</i>
                ): WPM >= 40 ? (
                <i className = {styles.g}>Sportsman!</i>
                 ) : (
                <i className = {styles.f}>Normal Man?</i>
                 )}
             <p className={styles.para}>Character Per Minute: <strong>{CPM}</strong></p>
             <p className={styles.para}>You're 
             {accuracy > 95 && WPM >= 50 ? (
                        <b className = {styles.e}> Senior Typist!</b>
                    ) : accuracy > 80 && WPM >= 40 ? (
                        <b className = {styles.g}> Junior Typist!</b>
                    ) : (
                        <b className = {styles.f}> Beginner!</b>
                    )}</p>
             <span className={styles.last1}>
                <Home/><Refresh/>
            </span>
        </div>
        )}
    </>
  );
};

export default function App(){
    return(
        <Typing>
            <Result/>
        </Typing>
    )
}
