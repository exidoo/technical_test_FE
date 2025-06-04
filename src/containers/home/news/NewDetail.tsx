/* eslint-disable react-hooks/exhaustive-deps */
// Router
import { useLocation, useNavigate } from 'react-router';

// Service
import { type Article as ArticleType } from '@/services/type/home';
import { ArticleData } from '../../../services/endpoint/home/home';

// React Tools
import { useEffect, useState } from 'react';

const NewsDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [recommendedArticles, setRecommendedArticles] = useState<ArticleType[]>([]);

  const article = state?.article ?? null;
  const allArticles = state?.allArticles || [];

  // Buat fungsi fetchRecommended di luar useEffect
  const fetchRecommended = async () => {
    if (!article) return;
    try {
      const response = await ArticleData.getDataBusiness();
      const articles = response.data.articles || [];

      const shuffled = articles
        .filter((a: ArticleType) => a.title !== article.title)
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
    return <div className="p-4 text-red-500">Artikel tidak ditemukan</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Main Article */}
      <div className="w-full lg:w-3/4">
        <nav className="text-sm text-gray-600 mb-4">
          <span onClick={() => navigate('/')} className="text-blue-600 cursor-pointer hover:underline">
            Home
          </span>{' '}
          / <span className="text-gray-800">{article.title.slice(0, 50)}...</span>
        </nav>

        <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
        <img
          src={article.urlToImage || '/image/news-handle.jpeg'}
          className="w-full h-auto rounded mb-4"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/image/news-handle.jpeg';
          }}
        />
        <p className="text-gray-700 mb-4 lg:text-lg">{article.content || article.description}</p>

        {article.url && (
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-blue-600 hover:underline">
            Baca selengkapnya di sumber asli
          </a>
        )}
      </div>

      {/* Sidebar */}
      <aside className="w-full lg:w-1/4">
        <h2 className="text-lg font-semibold mb-2 text-blue-700">Berita Lainnya</h2>
        <ul className="space-y-4">
          {recommendedArticles.map((item: ArticleType, idx: number) => (
            <li key={idx} className="cursor-pointer mb-8" onClick={() => navigate(`/news/${idx}`, { state: { article: item, allArticles } })}>
              <div className="flex gap-2 items-center ">
                <img src={item.urlToImage || '/image/news-handle.jpeg'} alt="thumb" className="w-[100px] h-[60px] rounded object-cover grow-1 " />
                <div className=" w-[170px]">
                  <p className="text-sm line-clamp-2">{item.title}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default NewsDetail;
