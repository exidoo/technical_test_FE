import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Components & containers
import Navbar from '../../components/navbar/Navbar';
import News from '../../containers/home/news/NewDetail';
const NewsDetail = () => {
    return (_jsxs("section", { children: [_jsx(Navbar, {}), _jsx(News, {})] }));
};
export default NewsDetail;
