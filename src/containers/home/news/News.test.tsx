import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import News from './News';
import * as homeAPI from '../../../services/endpoint/home/home';
import type { Article as ArticleType, GetDataArticle } from '@/services/type/home';
import { mockedAxiosResponse } from '../../../test/utils/mockAxiosResponse';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => jest.fn(),
}));

const mockArticles: ArticleType[] = [
  {
    author: 'John Doe',
    title: 'Test Article',
    description: 'This is a test article',
    url: 'https://example.com',
    urlToImage: 'https://example.com/image.jpg',
    publishedAt: '2024-01-01',
    content: 'Full content',
  },
];

describe('News Component', () => {
  beforeEach(() => {
    jest.spyOn(homeAPI.ArticleData, 'getDataApple').mockResolvedValue(
      mockedAxiosResponse<GetDataArticle>({
        status: 'ok',
        totalResults: 1,
        articles: mockArticles,
      })
    );

    jest.spyOn(homeAPI.ArticleData, 'getDataTesla').mockResolvedValue(
      mockedAxiosResponse<GetDataArticle>({
        status: 'ok',
        totalResults: 0,
        articles: [],
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state and then articles', async () => {
    render(
      <MemoryRouter>
        <News />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Test Article/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Read More/i)).toBeInTheDocument();
  });

  it('shows empty message if category has no articles', async () => {
    render(
      <MemoryRouter>
        <News />
      </MemoryRouter>
    );

    // Tunggu sampai artikel pertama muncul
    await waitFor(() => {
      expect(screen.getByText(/Test Article/i)).toBeInTheDocument();
    });

    // Klik tombol kategori "Tesla"
    fireEvent.click(screen.getByRole('button', { name: /Tesla/i }));

    // Tunggu sampai pesan kosong muncul
    await waitFor(() => {
      expect(screen.getByText(/Tidak ada berita yang terkait dengan Tesla/i)).toBeInTheDocument();
    });

    screen.debug(); // Cetak DOM ke console
  });

  it('can switch pages with pagination buttons', async () => {
    const manyArticles = Array.from({ length: 10 }, (_, i) => ({
      ...mockArticles[0],
      title: `Article ${i + 1}`,
    }));

    (homeAPI.ArticleData.getDataApple as jest.Mock).mockResolvedValueOnce(
      mockedAxiosResponse<GetDataArticle>({
        status: 'ok',
        totalResults: 10,
        articles: manyArticles,
      })
    );

    render(
      <MemoryRouter>
        <News />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Article 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    await waitFor(() => {
      expect(screen.getByText('Article 6')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Previous/i }));

    await waitFor(() => {
      expect(screen.getByText('Article 1')).toBeInTheDocument();
    });
  });
});

it('uses fallback image if image fails to load', async () => {
  render(
    <MemoryRouter>
      <News />
    </MemoryRouter>
  );

  const image = await screen.findByRole('img');

  // Simulasikan error saat load image
  fireEvent.error(image);

  expect(image).toHaveAttribute('src', '/image/news-handle.jpeg');
});

it('navigates to article detail with correct data', async () => {
  const mockNavigate = jest.fn();
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  jest.spyOn(require('react-router'), 'useNavigate').mockImplementation(() => mockNavigate);

  render(
    <MemoryRouter>
      <News />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/Test Article/i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/Read More/i));

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/news/0', expect.anything());
  });
});
