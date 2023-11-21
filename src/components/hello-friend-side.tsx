import { Link } from 'react-router-dom';

interface IHelloFreinds {
  navigateTo: string;
  buttonText: string;
}
const HelloFriendSide = ({ buttonText, navigateTo }: IHelloFreinds) => {
  return (
    <div className="flex-2 lg:block hidden">
      <div className="background">
        <img src="../images/ils1.488442d7.svg" />
        <Link to={navigateTo}>
          <button
            type="submit"
            className="w-36 h-12 text-center justify-center   font-medium text-white focus:outline-none bg-black rounded-full "
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};
export default HelloFriendSide;
