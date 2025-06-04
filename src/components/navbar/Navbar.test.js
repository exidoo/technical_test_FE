import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    console.error.mockRestore();
});
describe('Navbar Component', () => {
    it('renders the Navbar title', () => {
        render(_jsx(MemoryRouter, { children: _jsx(Navbar, {}) }));
        expect(screen.getByText(/We News/i)).toBeInTheDocument();
    });
    it('navigates to "/" when clicking on title', async () => {
        const user = userEvent.setup();
        render(_jsx(MemoryRouter, { initialEntries: ['/somewhere'], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx("div", { children: "Home Page" }) }), _jsx(Route, { path: "*", element: _jsx(Navbar, {}) })] }) }));
        await act(async () => {
            await user.click(screen.getByText(/We News/i));
        });
        expect(await screen.findByText('Home Page')).toBeInTheDocument();
    });
    it('navigates to "/" when clicking menu item', async () => {
        const user = userEvent.setup();
        render(_jsx(MemoryRouter, { initialEntries: ['/other'], children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx("div", { children: "Home Page" }) }), _jsx(Route, { path: "*", element: _jsx(Navbar, {}) })] }) }));
        await user.click(screen.getByRole('menuitem', { name: 'Home' }));
        expect(await screen.findByText('Home Page')).toBeInTheDocument();
    });
});
