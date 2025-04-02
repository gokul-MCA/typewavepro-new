import Word from '../components/home/Word'
import Input from '../components/home/Input'
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.main}>
        <div className={styles.links}>
                <a href="https://gokul-b.netlify.app/" target="_blank" rel="noopener noreferrer"><FaGlobe alt="portfolio" className={styles.fnt} /></a>
                <a href="https://github.com/gokul-MCA/typeWavePro" target="_blank" rel="noopener noreferrer"><IoLogoGithub className={styles.fnt} /></a>
                <a href="https://www.linkedin.com/in/gokul-b-mca/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn alt="linkedin" className={styles.fnt} /></a>
        </div>
        <div>
        <Word/>
        <Input/>
        </div>
    </div>
  )
}

export default Home;