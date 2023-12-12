import './App.css';
import CellTowerComponent from './components/CellTowerComponent/index';
import CellGlobe from './components/CellGlobe';


function App() {
  const height = window.innerHeight
  const width = window.innerWidth


  return (
    <div className="container">
      <div className="section globe-section">
        <CellGlobe width={width/2} height = {height} />
      </div>
      <div className="section other-section">
        <CellTowerComponent width={width / 2} height={height} />
        {/* <div className='vertical-container'>
          <div className='top-section'>
            
          </div>
          <div className='top-section'>
            sdadass
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
