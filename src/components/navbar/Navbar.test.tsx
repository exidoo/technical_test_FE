import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Navbar from './Navbar';
import { MemoryRouter, Route, Routes } from 'react-router';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((message) => {
    if (typeof message === 'string' && (message.includes('not wrapped in act(...)') || message.includes('not configured to support act(...)'))) {
      return;
    }
    console.error(message);
  });
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe('Navbar Component', () => {
  it('renders the Navbar title', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText(/We News/i)).toBeInTheDocument();
  });

  it('navigates to "/" when clicking on title', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/somewhere']}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="*" element={<Navbar />} />
        </Routes>
      </MemoryRouter>
    );

    await act(async () => {
      await user.click(screen.getByText(/We News/i));
    });

    expect(await screen.findByText('Home Page')).toBeInTheDocument();
  });

  it('navigates to "/" when clicking menu item', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/other']}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="*" element={<Navbar />} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('menuitem', { name: 'Home' }));
    expect(await screen.findByText('Home Page')).toBeInTheDocument();
  });
});
