import './App.css';
import BasicGrid from './components/BasicGrid.js';
import ButtonAppBar from './components/ButtonAppBar.js';
import RuleLightening from './components/RuleLightening.js';

function App() {
  return (
    <div>
      <header>
        <ButtonAppBar />
      </header>
      <body>
        {/* <BasicGrid /> */}
        <RuleLightening />
      </body>
    </div>
  );
}

export default App;
