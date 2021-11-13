import './App.css';
import BasicGrid from './components/BasicGrid.js';
import CustomizedDialogs from './components/CutomizedDialogs.js'

function App() {
  return (
    <div>
      <header>
        {/* navbar */}
      </header>
      <body>
        {/* box/ container/ grid */}
        <BasicGrid />
        <CustomizedDialogs />
      </body>
    </div>
  );
}

export default App;
