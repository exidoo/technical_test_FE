import { Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router';

const items = [{ key: '1', label: 'Home' }];

const Navbar = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any) => {
    if (e.key === '1') {
      navigate('/');
    }
  };

  return (
    <Header className="flex justify-between items-center">
      <div>
        <h1 className="text-white font-semibold cursor-pointer" onClick={() => navigate('/')}>
          We News
        </h1>
      </div>

      <Menu mode="horizontal" theme="dark" items={items} onClick={handleClick} />
    </Header>
  );
};

export default Navbar;
