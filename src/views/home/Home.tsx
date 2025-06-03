// Components & containers
import Navbar from '../../components/navbar/Navbar';
import News from '../../containers/home/news/News';

// And Design
import { Content } from 'antd/es/layout/layout';

const Home = () => {
  return (
    <Content>
      <Navbar />
      <News />
    </Content>
  );
};

export default Home;
