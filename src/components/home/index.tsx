import Dashboard from '../dashboard/dashboard';
import Navbar from '../navbar/navbar';
import Country from '../country/country';
import City from '../city/city';
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full">
        <Dashboard />
        <City />
      </div>
    </div>
  );
};
export default Home;
