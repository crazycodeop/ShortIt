import { useState } from 'react';
import './App.css';
import Background from './Background';
import InputShort from './InputShort';
import Link from './Link';

function App() {
  const [inputValue, setInputValue]=useState("");
  return (
    <div className="container">
      <InputShort setInputValue={setInputValue}/>
      <Background />
      <Link inputValue={inputValue}/>
    </div>
  );
}

export default App;
