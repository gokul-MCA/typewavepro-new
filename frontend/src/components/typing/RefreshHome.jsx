import React from 'react';
import { HiOutlineRefresh, HiOutlineHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import styles from './RefreshHome.module.css'

const Refresh = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate(0);
  };

  return (
    <>
      <HiOutlineRefresh className={styles.refresh} onClick={handleRefresh} />
    </>
  );
}

const Home = () => {
  const navigate = useNavigate();
  
  const deleteLocalStorage = async()=>{
    localStorage.removeItem("requestData");
  }

  return (
    <>
      <HiOutlineHome className = {styles.home} onClick = {() => {deleteLocalStorage(); navigate('/');}} />
    </>
  );
}

export { Refresh, Home };
