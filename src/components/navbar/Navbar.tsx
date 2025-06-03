import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

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
    <div className=" bg-[#001529]">
      <div className=" sm:w-[800px] lg:w-[1400px] flex justify-between items-center mx-auto">
        <div>
          <h1 className="text-white font-semibold cursor-pointer" onClick={() => navigate('/')}>
            We News
          </h1>
        </div>

        <Menu mode="horizontal" theme="dark" items={items} onClick={handleClick} />
      </div>
    </div>
  );
};

export default Navbar;
