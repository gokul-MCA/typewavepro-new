import React from 'react';
import { Text } from '../../utils/data';
import styles from './Word.module.css';

const Word = () => {
  return (
    <div>
      {Text.map((item, index) => (
        <div className={styles.main} key={index}>
          <h1 className={styles.h1}>{item.title}</h1>
          <p className={styles.p}>{item.paragraph}</p>
        </div>
      ))}
    </div>
  );
}

export default Word;
