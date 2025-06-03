// Routes
import { Routes, Route } from 'react-router';

// Views
import Home from './views/home/Home';
import NewsDetail from './views/home/NewsDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news/:id" element={<NewsDetail />} />
    </Routes>
  );
}

export default App;
