import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Menu } from 'antd';
import { useNavigate } from 'react-router';
const items = [{ key: '1', label: 'Home' }];
const Navbar = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e) => {
    if (e.key === '1') {
      navigate('/');
    }
  };
  return _jsx('div', {
    className: ' bg-[#001529]',
    children: _jsxs('div', {
      className: ' sm:w-[800px] lg:w-[1400px] flex justify-between items-center mx-auto',
      children: [
        _jsx('div', { children: _jsx('h1', { className: 'text-white font-semibold cursor-pointer', onClick: () => navigate('/'), children: 'We News' }) }),
        _jsx(Menu, { mode: 'horizontal', theme: 'dark', items: items, onClick: handleClick }),
      ],
    }),
  });
};
export default Navbar;
