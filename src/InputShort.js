import { useState } from 'react';
import './App.css';

function InputShort({setInputValue}) {
  const [value, setValue]=useState("");

  const handleClick = ()=> {
    setInputValue(value);
    setValue("");
  }

  return (
    <div className="inputContainer">
      <h1>URL <span>Shortener</span></h1>
      <div>
        <input 
          type="text" 
          placeholder='Paste your url...'
          value={value}
          onChange={(e)=>setValue(e.target.value)} 
        />
        <button onClick={handleClick}>shorten</button>
      </div>
    </div>
  );
}

export default InputShort;