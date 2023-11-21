import { CountryIcon, HomeIcon } from '../../icons/icon';
const Dashboard = () => {
  return (
    <div className="flex-1">
      <aside
        id="default-sidebar"
        className="w-56 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <h1 className="px-2">Menu</h1>
        <div className="h-full px-4 py-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/"
                className="flex items-center p-2 text-black rounded-lg dark:text-white hover:bg-gray-100 hover:transition-all hover:ease-in-out hover:duration-500  dark:hover:text-black group"
              >
                <HomeIcon />

                <span className="ml-3 text-md">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-black dark:hover:text-black"
              >
                <CountryIcon />
                <span className="flex-1 ml-3 whitespace-nowrap text-black text-md">
                  Country
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
