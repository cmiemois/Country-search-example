import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<Object>>([]);
  const [error, setError] = useState(null);
  const [continentParam, setContinentParam] = useState('All');
  const searchParam = useState(['capital', 'name']);
  const [query, setQuery] = useState('');



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

  function search(countries: any) {
    // I attempted to make a text search work but was unsuccessful
    // eslint-disable-next-line array-callback-return
    return countries.filter((country: any) => {
        if (country.continents.includes(continentParam)) {
            return searchParam.some((newItem: any) => {
                return country;
            });
        } else if (continentParam === "All") {
            return searchParam.some((newItem: any) => {
                return country;
            });
        }
    });
}


  if (error) {
    return (<>{error['message']}</>);
  }
  else if (loading) {
    return (<>Loading</>);
  } else {
    return (
      <div className="wrapper">

        <div className="searchWrapper">
          <label htmlFor='search-form'>
            <input
              type="search"
              name="search-form"
              className="search-input"
              placeholder="BROKEN: Search country by name"
              value={query}
              onChange={e => setQuery(e.target.value)}></input>
          </label>
        </div>

        <div className='select'>
          <select aria-label='Filter by continent'
            onChange={(e) => { setContinentParam(e.target.value) }}>
            <option value="All">Filter By Region</option>
            <option value="Africa">Africa</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        <ul className="card-grid">
          {search(data).map((country: any) => (
            <li>
              <article className="card" key={country.ccn3}>
                <div className="card-image">
                  <img id="flag" src={country.flags.svg} alt={country.flags.alt} />
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
