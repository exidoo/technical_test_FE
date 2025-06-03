// React Tools
import { useEffect, useState } from 'react';

// Services
import { type Article as ArticleType } from '@/services/type/home';
import { Article } from '@/services/endpoint/home/home';

// Router
import { useNavigate } from 'react-router';

const CATEGORY_OPTIONS = [
  { label: 'Apple', key: 'apple', fetch: Article.getDataApple },
  { label: 'Tesla', key: 'tesla', fetch: Article.getDataTesla },
  { label: 'Business', key: 'business', fetch: Article.getDataBusiness },
  { label: 'TechCrunch', key: 'techcrunch', fetch: Article.getDataTechCrunch },
  { label: 'Wall Street', key: 'wallstreet', fetch: Article.getDataWallStreet },
];

const News = () => {
  // Category
  const [activeCategory, setActiveCategory] = useState('apple');
  const [dataMap, setDataMap] = useState<Record<string, ArticleType[]>>({});

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

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setCurrentPage(1);
  };

  return (
    <section className="p-4 ">
      <div className=" max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-6 ">
        {/* List Artikel */}
        <div className="mb-6 w-full lg:w-[70%]">
          <h2 className="text-xl font-bold mb-2">{CATEGORY_OPTIONS.find((c) => c.key === activeCategory)?.label} News</h2>

          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-10 text-gray-600 italic">Tidak ada berita yang terkait dengan {CATEGORY_OPTIONS.find((c) => c.key === activeCategory)?.label}</div>
          ) : (
            <ul className="space-y-4">
              {paginatedArticles.map((article, index) => (
                <li key={index} className="flex items-center mb-8">
                  <div className="flex gap-4 p-3 rounded-lg  hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={article.urlToImage || '/image/news-handle.jpeg'}
                      alt={article.urlToImage}
                      srcSet={article.urlToImage}
                      className="w-[150px] h-[100px] rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/image/news-handle.jpeg';
                      }}
                    />
                    <div className="ml-2">
                      <h1 className="font-semibold line-clamp-2">{article.title}</h1>
                      <p className="text-sm text-gray-600 break-words whitespace-normal  line-clamp-2">{article.description}</p>

                      <button
                        className="bg-blue-600 text-white mt-2 p-1 rounded-lg cursor-pointer"
                        onClick={() =>
                          navigate(`/news/${index}`, {
                            state: {
                              article,
                              allArticles: dataMap[activeCategory] || [], // ✅ kirim semua artikel
                            },
                          })
                        }
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Tombol Load More */}
          <div className="mt-4 flex gap-2 items-center justify-center">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer">
              Previous
            </button>
            <button disabled={endIndex >= articles.length} onClick={() => setCurrentPage((prev) => prev + 1)} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 cursor-pointer">
              Next
            </button>
          </div>
        </div>

        {/* Kategori */}
        <div>
          <h1 className=" font-semibold text-xl text-blue-800 mb-2">Tag Pencarian</h1>
          <div className="mb-4 flex gap-2 flex-wrap">
            {CATEGORY_OPTIONS.map((cat) => (
              <button key={cat.key} onClick={() => handleCategoryChange(cat.key)} className={`px-4 py-1 rounded-full border cursor-pointer ${activeCategory === cat.key ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
