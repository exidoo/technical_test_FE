import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
// React Tools
import { useEffect, useState } from 'react';
// Services
import {} from '@/services/type/home';
import { ArticleData } from '../../../services/endpoint/home/home';
// Router
import { useNavigate } from 'react-router';
// Components
import { Button } from 'antd';
const CATEGORY_OPTIONS = [
    { label: 'Apple', key: 'apple', fetch: ArticleData.getDataApple },
    { label: 'Tesla', key: 'tesla', fetch: ArticleData.getDataTesla },
    { label: 'Business', key: 'business', fetch: ArticleData.getDataBusiness },
    { label: 'TechCrunch', key: 'techcrunch', fetch: ArticleData.getDataTechCrunch },
    { label: 'Wall Street', key: 'wallstreet', fetch: ArticleData.getDataWallStreet },
];
const News = () => {
    // Category
    const [activeCategory, setActiveCategory] = useState('apple');
    const [dataMap, setDataMap] = useState({});
    // Loading
    const [loading, setLoading] = useState(false);
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const articles = dataMap[activeCategory] || [];
    const paginatedArticles = articles.slice(startIndex, endIndex);
    // Router
    const navigate = useNavigate();
    // Fetching by category
    useEffect(() => {
        const selectedCategory = CATEGORY_OPTIONS.find((c) => c.key === activeCategory);
        if (selectedCategory && !dataMap[activeCategory]) {
            setLoading(true);
            selectedCategory
                .fetch()
                .then((res) => {
                setDataMap((prev) => ({ ...prev, [activeCategory]: res.data.articles }));
            })
                .finally(() => {
                setLoading(false);
            });
        }
    }, [activeCategory, dataMap]);
    const handleCategoryChange = (key) => {
        setActiveCategory(key);
        setCurrentPage(1);
    };
    return (_jsx("section", { className: "p-4 ", children: _jsxs("div", { className: " max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-6 ", children: [_jsxs("div", { className: "mb-6 w-full lg:w-[70%]", children: [_jsxs("h2", { className: "text-xl font-bold mb-2", children: [CATEGORY_OPTIONS.find((c) => c.key === activeCategory)?.label, " News"] }), loading ? (_jsx("div", { role: "status", "aria-live": "polite", className: "flex justify-center items-center py-10", children: _jsx("div", { className: "w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" }) })) : articles.length === 0 ? (_jsxs("div", { className: "text-center py-10 text-gray-600 italic", children: ["Tidak ada berita yang terkait dengan ", CATEGORY_OPTIONS.find((c) => c.key === activeCategory)?.label] })) : (_jsx("ul", { className: "space-y-4", children: paginatedArticles.map((article, index) => (_jsx("li", { className: "flex items-center mb-8", children: _jsxs("div", { className: "flex gap-4 p-3 rounded-lg  hover:shadow-lg transition-shadow duration-300 w-full", children: [_jsx("img", { src: article.urlToImage || '/image/news-handle.jpeg', alt: "News Image", className: "w-[150px] h-[100px] rounded-lg object-cover", onError: (e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = '/image/news-handle.jpeg';
                                            } }), _jsxs("div", { className: "ml-2 lg:w-[60%]", children: [_jsx("h1", { className: "font-semibold line-clamp-2", children: article.title }), _jsx("p", { className: "text-sm text-gray-600 break-words whitespace-normal  line-clamp-2", children: article.description }), _jsx(Button, { className: "mt-2 p-1 rounded-lg cursor-pointer px-2", type: "primary", onClick: () => navigate(`/news/${index}`, {
                                                        state: {
                                                            article,
                                                            allArticles: dataMap[activeCategory] || [], // ✅ kirim semua artikel
                                                        },
                                                    }), children: "Read More" })] })] }) }, index))) })), _jsxs("div", { className: "mt-4 flex gap-2 items-center justify-center", children: [_jsx(Button, { disabled: currentPage === 1, type: "primary", onClick: () => setCurrentPage((prev) => prev - 1), className: "px-4 py-2  rounded disabled:opacity-50 cursor-pointer", children: "Previous" }), _jsx(Button, { disabled: endIndex >= articles.length, type: "primary", onClick: () => setCurrentPage((prev) => prev + 1), className: "px-4 py-2  rounded disabled:opacity-50 cursor-pointer", children: "Next" })] })] }), _jsxs("div", { children: [_jsx("h1", { className: " font-semibold text-xl text-blue-800 mb-2", children: "Tag Pencarian" }), _jsx("div", { className: "mb-4 flex gap-2 flex-wrap", children: CATEGORY_OPTIONS.map((cat) => (_jsx("button", { onClick: () => handleCategoryChange(cat.key), className: `px-4 py-1 rounded-full border cursor-pointer ${activeCategory === cat.key ? 'bg-blue-600 text-white' : 'bg-white text-black'}`, children: cat.label }, cat.key))) })] })] }) }));
};
export default News;
