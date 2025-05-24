// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AppPage from './components/AppPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
    </Router>
  );
}


export default App;
