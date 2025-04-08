import CustomButton from "../../components/ui/CustomButton";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const handleTestWithoutSignup = () => {
    navigate("/practice");
  };
  const handleSignup = () => {
    navigate("/sign-up");
  };

  return (
    <section className={styles.section}>
      <div className={`${styles.box} ${styles.box1}`}>
        <h1 className={styles.heading}>TypeWavePro</h1>

        <h2 className={styles.heading2}>Boost Speed & Accuracy</h2>
        <h2 className={styles.heading2}>Engaging Topics & Tests</h2>

        <p className={styles.paragraph}>
          Enhance your typing skills with personalized typing tests, choose
          variety of topics and become a typing master to improve typing speed
          and accuracy.
        </p>

        <div className={styles.buttons}>
          <CustomButton
            label="Sign up – It's free!"
            variant="contained"
            sx={{ border: "none" }}
            onClick={handleSignup}
          />
          <CustomButton
            label="Try Without Sign Up"
            variant="outlined"
            onClick={handleTestWithoutSignup}
          />
        </div>
      </div>

      <div className={`${styles.box} ${styles.box2}`}>
        This Box renders as an HTML section element.
      </div>
    </section>
  );
};

export default Home;
