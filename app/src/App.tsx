import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const BASE_URL: URL = new URL('https://restcountries.com/v3.1/');

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(
        (result) => {
          setLoading(false);
          setData(result);
        },

        (error) => {
          setLoading(false);
          setError(error);
        }
      );
  }, []);


  if (error) {
    return (<>{error['message']}</>);
  }
  else if (loading) {
    return (<>Loading</>);
  } else {
    return (
      <div className="wrapper">
        <ul className="card-grid">
          {data.map((country) => (
            <li>
              <article className="card" key={country.ccn3}>
                <div className="card-image">
                  <img id="flag" src={country.flags.svg} alt={country.name.common} />
                </div>
                <div className="card-content">
                  <h2 className="card-name">{country.name.common}</h2>
                  <ol className="card-list">
                    <li>
                      population:{" "}
                      <span>{country.population}</span>
                    </li>
                    <li>
                      Region: <span>{country.region}</span>
                    </li>
                    <li>
                      Capital: <span>{country.capital}</span>
                    </li>
                  </ol>
                </div>
              </article>
            </li>

          ))}
        </ul>
      </div>
    );
  }

}

export default App;
