import React, { useState, useCallback } from 'react';
import Letter from './Letter';
import './App.css';

import h0 from './images/0.png';
import h1 from './images/1.png';
import h2 from './images/2.png';
import h3 from './images/3.png';
import h4 from './images/4.png';
import h5 from './images/5.png';
import h6 from './images/6.png';
import h7 from './images/7.png';

const word = 'Logiciel';
const aphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const hangmanDrawings = [h0,h1,h2,h3,h4,h5,h6,h7];
const DEFAULT_LETTERS_FOUND = word.split('').map(letter => {
  return {letter: letter, value: "_"}
});

const App = () => {
  const [errorsNumber, setErrorsNumber] = useState(0);
  const [lettersFoundNumber, setLettersFoundNumber] = useState(0);
  const [lettersFound, setLettersFound] = useState(DEFAULT_LETTERS_FOUND);
  const [hangman, setHangman] = useState(hangmanDrawings[errorsNumber]);

  function handleLetterClick(e) {
    const letterClicked = e.currentTarget.innerHTML;

    word.toUpperCase().indexOf(letterClicked) === -1 && setErrorsNumber(errorsNumber+1);

    const newLettersFound = lettersFound.map((letters, index) => {
      const wordLetter = lettersFound[index]['letter'].toUpperCase();
      const letter = letters['letter'];
      const value = letters['value'];

      wordLetter === letterClicked && setLettersFoundNumber(lettersFoundNumber+1);

      return (
        wordLetter === letterClicked || value !== "_" ? {letter: letter, value: letter}: {letter: letter, value: "_"}
      )
    });

    if (errorsNumber === hangmanDrawings.length-1) {
      alert("You lose");
      window.location.reload();
    }

    if (lettersFoundNumber === word.length) {
      alert("You win");
      window.location.reload();
    }

    setHangman(hangmanDrawings[errorsNumber]);
    setLettersFound(newLettersFound);
  };

  return (
    <div className="App">
      <div id="word">
        {word.split('').map((letter, index) => {
          return(
            <div key={index}>
              {lettersFound[index]['value']}
            </div>
          )
        })}
      </div>

      <div id="letters">
        {aphabet.split('').map((letter, index) => {
          return(
            <Letter letter={letter} letterClicked={handleLetterClick} key={index} />
          )
        })}
      </div>
      
      <img src={hangman} alt="hangman" />

      <div id="attemptsLeft">
        Attempts Left : { hangmanDrawings.length-errorsNumber }
      </div>
    </div>
  );
}

export default App;