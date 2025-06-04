import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Routes
import { Routes, Route } from 'react-router';
// Views
import Home from './views/home/Home';
import NewsDetail from './views/home/NewsDetail';
function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/news/:id", element: _jsx(NewsDetail, {}) })] }));
}
export default App;
