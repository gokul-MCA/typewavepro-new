import styles from "./LoginResult.module.css";
import { useContext } from "react";
import { PracticeState } from "../practice/PracticeLogic";
import CustomButton from "../ui/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import CustomGauge from "../ui/CustomGauge";

const LoginResult: React.FC = () => {
  const context = useContext(PracticeState);
  if (!context) throw new Error("Practise must be used within a PractiseLogic");
  const { mistakes, minutes, seconds, accuracy, CPM, WPM } = context;
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/dashboard");
  };
  return (
    <>
      {minutes === 0 && seconds === 0 && (
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.analysis}>
          <div className={styles.cpm}>
              <h2>{CPM}</h2>
              <h2>Char/Min</h2>
            </div>
            <div className={styles.gauge}>
              <CustomGauge value={accuracy} />

              <h2>Accuracy</h2>
            </div>
            <div className={styles.wpm}>
              <h2>{WPM}</h2>
              <h2>Words/Min</h2>
            </div>
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
                {/* <Link to='/dashboard'> */}
                <CustomButton
                  variant="contained"
                  label="Go to dashboard"
                  sx={{ border: "none" }}
                  onClick={handleSignUp}
                  />
                  {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
       )} 
    </>
  );
};

export default LoginResult;
