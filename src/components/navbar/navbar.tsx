import {
  IconBags,
  IconLetters,
  IconMoon,
  IconNotifications,
  IconPainting,
} from '../../icons/icon';

const Navbar = () => {
  return (
    <div>
      <nav className="bg-white w-full h-20 flex justify-between items-center p-2">
        <div className="flex justify-between text-center items-center">
          <img src="../images/favicon.cbd04736.svg" alt="" />
          <h1 className=" mx-9 font-bold text-lg">DashCode</h1>
          <div
            className="h-4 w-4 border-[1.5px] border-black dark:border-black rounded-full transition-all duration-150
          ring-2 ring-inset ring-offset-4 ring-black-900 dark:ring-black bg-black dark:bg-black dark:ring-offset-black
          "
          ></div>
        </div>
        <div className="flex justify-between">
          <img
            src="../images/lanhuage.png"
            className="w-8 h-8 rounded-full cursor-pointer"
            alt=""
          />
          <div className="w-9 h-9 rounded-full bg-blue-50 mx-4 flex justify-center  text-center">
            <IconMoon />
          </div>
          <div className="w-9 h-9 bg-blue-50 rounded-full mx-4 flex text-center  items-center justify-center">
            <IconPainting />
          </div>
          <div className="w-9 h-9 bg-blue-50 rounded-full mx-4 flex justify-center items-center text-center">
            <IconBags />
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-50 mx-4 flex justify-center items-center text-center">
            <IconLetters />
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-50 mx-4 flex justify-center items-center text-center">
            <IconNotifications />
          </div>
          <div className="flex justify-center items-center text-center">
            <img
              src="../images/person.png"
              className="w-8 h-8 mx-4 rounded-full"
              alt=""
            />
            <h2 className="text-gray-400">Katia Alhaj</h2>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
