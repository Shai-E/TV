import React, {useState} from 'react';

const NumberKeyboard = ({ onKeyPress }) => {
    const numbers = Array.from({ length: 10 }, (_, i) => i);
  
    // Handler when a number button is clicked
    const handleButtonClick = (number) => {
      // Simulate the keypress
      onKeyPress(number);
    };
  
    return (
      <div style={styles.keyboardRow}>
        {numbers.map((number) => (
          <button
            key={number}
            style={styles.button}
            onClick={() => handleButtonClick(number)}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };
  
  const styles = {
    keyboardRow: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '10px',
    },
    button: {
      padding: '15px 25px',
      fontSize: '18px',
      cursor: 'pointer',
      margin: '5px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      backgroundColor: '#f1f1f1',
    },
  };
  
  export default NumberKeyboard;