import './App.css';
import CellTowerComponent from './components/CellTowerComponent/index';
import CellGlobe from './components/CellGlobe';
import MyBarPlotComponent from './components/MyBarPlotComponent/index.js';
import MyDonutChartComponent from './components/MyDonutChartComponent/index.js';


function App() {
  const height = window.innerHeight
  const width = window.innerWidth

  return (
    <div>
    <div className="container">
      <div className="section globe-section">
        <CellGlobe width={width / 2} height={height} />
      </div>
      <div className="section">
        <div className="vertical-container">
          <div className="top-section">
            <div className="other-section">
              <div className="section">
                <CellTowerComponent width={width / 4} height={height / 2} />
              </div>
              <div className="section">
                <MyDonutChartComponent width={width / 4} height={height / 2}></MyDonutChartComponent>

              </div>
            </div>
          </div>
          <div className="top-section">
            <div>
              <h6 style={{padding: 0, margin: 0, marginLeft: 30}}>Top countries with most number of cell towers</h6>
              <MyBarPlotComponent width={width / 2} height={(height / 2)-20} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
