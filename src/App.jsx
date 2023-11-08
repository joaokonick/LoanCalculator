import logo from './logo.svg';
import './App.css';
import usedata from "./hooks/useData"
import CountrySelect from "./components/CountrySelect"

function App() {
  const data = usedata()
  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
      <p>{data}</p>
      <div style={{textAlign: 'center', display: 'flex', justifyContent: 'center'}}>
        <CountrySelect/>
      </div>
    </div>
      </header>

      
    </div>
  );
}

export default App;
