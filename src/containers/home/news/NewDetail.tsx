import { useLocation, useNavigate } from 'react-router';

const NewsDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const article = state?.article;

  if (!article) return <div className="p-4 text-red-500">Artikel tidak ditemukan</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 mb-4">
        <span onClick={() => navigate('/')} className="text-blue-600 cursor-pointer hover:underline">
          Home
        </span>{' '}
        / <span className="text-gray-800">{article.title.slice(0, 50)}...</span>
      </nav>

      {/* Detail Artikel */}
      <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
      <img src={article.urlToImage} className="w-full h-auto rounded mb-4" />
      <p className="text-gray-700 mb-4">{article.content || article.description}</p>

      {article.url && (
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-blue-600 hover:underline">
          Baca selengkapnya di sumber asli
        </a>
      )}
    </div>
  );
};

export default NewsDetail;
