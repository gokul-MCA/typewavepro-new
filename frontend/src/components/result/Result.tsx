import styles from "./Result.module.css";
import { useContext } from "react";
import { PracticeState } from "../practice/PracticeLogic";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import { Box, Button, Typography } from "@mui/material";
import CustomButton from "../ui/CustomButton";
import { useNavigate } from "react-router-dom";
import CustomGauge from "../ui/CustomGauge";

const Result: React.FC = () => {
  const context = useContext(PracticeState);
  if (!context) throw new Error("Practise must be used within a PractiseLogic");
  const { mistakes, minutes, seconds, accuracy } = context;
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate('/sign-up')
  }
  return (
    <>
      {/* {minutes === 0 && seconds === 0 && ( */}
        <div className={styles.container}>
          <div className={styles.box}>
            <div>
              <CustomGauge value={accuracy} />
              <h2>Accuracy</h2>
            </div>
            <div className={styles.feedback}>
              <div className={styles.points_section}>
                <ul className={styles.points}>
                  <li>Sign in for free and unlock personalized features</li>
                  <li>Always look at the screen while practicing</li>
                  <li>Always float your hands above the keyboard</li>
                  <li>Prioritize accuracy first, then work on speed</li>
                </ul>
              </div>
              <div className={styles.blur}></div>
              <div className={styles.suggestion}>
                <div className={styles.suggestion_section}>
                  <h2>
                    Unlock Premium Insights <br />
                    Free Sign Up!
                  </h2>
                  <CustomButton variant="contained" label="Sign Up Now" onClick={handleSignUp}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
    </>
  );
};
export default Result;
