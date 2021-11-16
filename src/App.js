import './App.css';
import BasicGrid from './components/BasicGrid.js';
import ButtonAppBar from './components/ButtonAppBar.js';

function App() {
  return (
    <div>
      <header>
        <ButtonAppBar />
      </header>
      <body>
        <BasicGrid />
      </body>
    </div>
  );
}

export default App;
