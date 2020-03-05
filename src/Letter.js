import React from 'react';
import './Letter.css';

const Letter = ({ letter, letterClicked }) => {
    function handleLetterClick(letter) {
        return letterClicked(letter);
    }

    return(
        <div className="letter" onClick={handleLetterClick}>
            {letter}
        </div>
    )
};

export default Letter;