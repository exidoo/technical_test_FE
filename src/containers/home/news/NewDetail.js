import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
/* eslint-disable react-hooks/exhaustive-deps */
// Router
import { useLocation, useNavigate } from 'react-router';
// Service
import {} from '@/services/type/home';
import { ArticleData } from '../../../services/endpoint/home/home';
// React Tools
import { useEffect, useState } from 'react';
const NewsDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const article = state?.article ?? null;
  const allArticles = state?.allArticles || [];
  // Buat fungsi fetchRecommended di luar useEffect
  const fetchRecommended = async () => {
    if (!article) return;
    try {
      const response = await ArticleData.getDataBusiness();
      const articles = response.data.articles || [];
      const shuffled = articles
        .filter((a) => a.title !== article.title)
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
      setRecommendedArticles(shuffled);
    } catch (error) {
      console.error('Gagal mengambil rekomendasi artikel:', error);
    }
  };
  useEffect(() => {
    fetchRecommended();
  }, [article]);
  if (!article) {
    return _jsx('div', { className: 'p-4 text-red-500', children: 'Artikel tidak ditemukan' });
  }
  return _jsxs('div', {
    className: 'p-4 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8',
    children: [
      _jsxs('div', {
        className: 'w-full lg:w-3/4',
        children: [
          _jsxs('nav', {
            className: 'text-sm text-gray-600 mb-4',
            children: [
              _jsx('span', { onClick: () => navigate('/'), className: 'text-blue-600 cursor-pointer hover:underline', children: 'Home' }),
              ' ',
              '/ ',
              _jsxs('span', { className: 'text-gray-800', children: [article.title.slice(0, 50), '...'] }),
            ],
          }),
          _jsx('h1', { className: 'text-2xl font-bold mb-2', children: article.title }),
          _jsx('img', {
            src: article.urlToImage || '/image/news-handle.jpeg',
            className: 'w-full h-auto rounded mb-4',
            onError: (e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/image/news-handle.jpeg';
            },
          }),
          _jsx('p', { className: 'text-gray-700 mb-4 lg:text-lg', children: article.content || article.description }),
          article.url && _jsx('a', { href: article.url, target: '_blank', rel: 'noopener noreferrer', className: 'inline-block mt-2 text-blue-600 hover:underline', children: 'Baca selengkapnya di sumber asli' }),
        ],
      }),
      _jsxs('aside', {
        className: 'w-full lg:w-1/4',
        children: [
          _jsx('h2', { className: 'text-lg font-semibold mb-2 text-blue-700', children: 'Berita Lainnya' }),
          _jsx('ul', {
            className: 'space-y-4',
            children: recommendedArticles.map((item, idx) =>
              _jsx(
                'li',
                {
                  className: 'cursor-pointer mb-8',
                  onClick: () => navigate(`/news/${idx}`, { state: { article: item, allArticles } }),
                  children: _jsxs('div', {
                    className: 'flex gap-2 items-center ',
                    children: [
                      _jsx('img', { src: item.urlToImage || '/image/news-handle.jpeg', alt: 'thumb', className: 'w-[100px] h-[60px] rounded object-cover grow-1 ' }),
                      _jsx('div', { className: ' w-[170px]', children: _jsx('p', { className: 'text-sm line-clamp-2', children: item.title }) }),
                    ],
                  }),
                },
                idx
              )
            ),
          }),
        ],
      }),
    ],
  });
};
export default NewsDetail;
