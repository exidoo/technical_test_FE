import { Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';

const items = [
  { key: '1', label: 'Home' },
  { key: '2', label: 'About' },
  { key: '3', label: 'News' },
];

const Navbar = () => {
  return (
    <Header className="flex justify-between items-center">
      <div>
        <h1 className="text-white font-semibold cursor-pointer">We News</h1>
      </div>

      <Menu mode="horizontal" theme="dark" items={items} />
    </Header>
  );
};

export default Navbar;
