import './App.css';
import BasicGrid from './components/BasicGrid.js';
import ButtonAppBar from './components/ButtonAppBar.js';
import RuleLightning from './components/RuleLightning.js';

function App() {
  return (
    <div>
      <header>
        <ButtonAppBar />
      </header>
      <body>
        {/* <BasicGrid /> */}
        <RuleLightning />
      </body>
    </div>
  );
}

export default App;
