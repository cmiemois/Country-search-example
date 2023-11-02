import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const BASE_URL: URL = new URL('https://restcountries.com/v3.1/');

function Button() {
  const [loading, isloaded] = useState(true);
  const [data, datapoints] = useState([]);

  useEffect(() => {
    fetch(BASE_URL+'all').then(res => res.json());
    
    // Add the stuff, make the stuff do the thing
  }, []);

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <button onClick={getFullList}>Load from API</button>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>);
  } else {
    return (
      <div>
      </div>
    );
  }
}

function App() {

  return (
    <div><p>Hello, I am placeholder</p></div>
  );
}

async function getFullList(): Promise<Object> {
  const response = await fetch(BASE_URL + 'all');
  return response;
}

export default App;
