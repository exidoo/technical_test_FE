import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import NewsDetail from './NewDetail';
import { ArticleData } from '../../../services/endpoint/home/home';

// Mock navigate
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => jest.fn(),
}));

// Mock service
jest.mock('../../../services/endpoint/home/home', () => ({
  ArticleData: {
    getDataBusiness: jest.fn().mockResolvedValue({
      data: { articles: [] },
    }),
  },
}));

const mockArticle = {
  title: 'Mock Title',
  description: 'Mock Description',
  content: 'Mock Content',
  url: 'https://example.com',
  urlToImage: '',
};

const mockRecommended = [
  { title: 'Other News 1', urlToImage: '', description: '', content: '', url: '' },
  { title: 'Other News 2', urlToImage: '', description: '', content: '', url: '' },
];

describe('NewsDetail Component', () => {
  it('shows "Artikel tidak ditemukan" if no article in state', () => {
    render(
      <MemoryRouter initialEntries={['/news/1']}>
        <Routes>
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Artikel tidak ditemukan/i)).toBeInTheDocument();
  });

  it('renders article details and recommended articles', async () => {
    (ArticleData.getDataBusiness as jest.Mock).mockResolvedValue({
      data: { articles: mockRecommended },
    });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/news/1', state: { article: mockArticle } }]}>
        <Routes>
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Tunggu render utama
    await waitFor(() => {
      expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
      expect(screen.getByText(mockArticle.content)).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    // Tunggu recommended articles muncul
    await waitFor(() => {
      expect(screen.getByText('Other News 1')).toBeInTheDocument();
      expect(screen.getByText('Other News 2')).toBeInTheDocument();
    });
  });

  it('navigates when clicking recommended article', async () => {
    const mockedNavigate = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    jest.spyOn(require('react-router'), 'useNavigate').mockImplementation(() => mockedNavigate);

    (ArticleData.getDataBusiness as jest.Mock).mockResolvedValue({
      data: { articles: mockRecommended },
    });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/news/1', state: { article: mockArticle } }]}>
        <Routes>
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Other News 1'));

    const item = screen.getByText('Other News 1');
    fireEvent.click(item);

    // Pastikan navigate dipanggil
    expect(mockedNavigate).toHaveBeenCalled();
  });

  it('fallbacks to default image on error', async () => {
    (ArticleData.getDataBusiness as jest.Mock).mockResolvedValue({
      data: { articles: mockRecommended },
    });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/news/1', state: { article: mockArticle } }]}>
        <Routes>
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </MemoryRouter>
    );

    const image = screen.getByRole('img') as HTMLImageElement;
    fireEvent.error(image);

    expect(image.src).toContain('/image/news-handle.jpeg');
  });
});
