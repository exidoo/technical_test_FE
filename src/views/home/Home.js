import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Components & containers
import Navbar from '../../components/navbar/Navbar';
import News from '../../containers/home/news/News';
// And Design
import { Content } from 'antd/es/layout/layout';
const Home = () => {
    return (_jsxs(Content, { children: [_jsx(Navbar, {}), _jsx(News, {})] }));
};
export default Home;
