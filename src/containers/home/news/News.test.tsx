import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import News from './News'; // Ganti path sesuai struktur folder kamu
import { ArticleData } from '../../../services/endpoint/home/home';

// Mock navigate
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => jest.fn(),
}));

// Mock fetch article data
jest.mock('../../../services/endpoint/home/home', () => ({
  ArticleData: {
    getDataApple: jest.fn(),
    getDataTesla: jest.fn(),
    getDataBusiness: jest.fn(),
    getDataTechCrunch: jest.fn(),
    getDataWallStreet: jest.fn(),
  },
}));

const mockArticles = [
  {
    title: 'Mock News Title',
    description: 'Mock description',
    urlToImage: '',
  },
];

describe('News Component', () => {
  beforeEach(() => {
    (ArticleData.getDataApple as jest.Mock).mockResolvedValue({
      data: { articles: mockArticles },
    });
  });

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <News />
      </BrowserRouter>
    );

  it('renders loading spinner initially and then articles', async () => {
    renderComponent();

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('Mock News Title')).toBeInTheDocument());
  });

  it('shows "Read More" button and handles click', async () => {
    renderComponent();

    await waitFor(() => expect(screen.getByText('Mock News Title')).toBeInTheDocument());

    const readMoreButton = screen.getByRole('button', { name: /read more/i });
    expect(readMoreButton).toBeInTheDocument();
  });

  it('changes category and refetches data', async () => {
    (ArticleData.getDataTesla as jest.Mock).mockResolvedValue({
      data: { articles: [{ title: 'Tesla News', description: 'Tesla Desc', urlToImage: '' }] },
    });

    renderComponent();

    const teslaButton = screen.getByRole('button', { name: 'Tesla' });
    fireEvent.click(teslaButton);

    await waitFor(() => expect(screen.getByText('Tesla News')).toBeInTheDocument());
  });

  it('shows no article message if data empty', async () => {
    (ArticleData.getDataBusiness as jest.Mock).mockResolvedValue({
      data: { articles: [] },
    });

    renderComponent();

    const businessButton = screen.getByRole('button', { name: 'Business' });
    fireEvent.click(businessButton);

    await waitFor(() => expect(screen.getByText(/Tidak ada berita yang terkait dengan Business/i)).toBeInTheDocument());
  });

  it('handles pagination buttons', async () => {
    const manyArticles = Array.from({ length: 8 }, (_, i) => ({
      title: `Title ${i + 1}`,
      description: 'desc',
      urlToImage: '',
    }));

    (ArticleData.getDataApple as jest.Mock).mockResolvedValue({
      data: { articles: manyArticles },
    });

    renderComponent();

    await waitFor(() => expect(screen.getByText('Title 1')).toBeInTheDocument());

    const nextBtn = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextBtn);

    await waitFor(() => expect(screen.getByText('Title 6')).toBeInTheDocument());
  });
});
