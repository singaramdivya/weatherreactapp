import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CitiesTable from './components/CitiesTable';
import WeatherPage from './components/WeatherPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CitiesTable />} />
        <Route path="/weather/:city" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
}
export default App