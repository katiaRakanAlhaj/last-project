import { RiddetIcon, TwitterIcon, WhatsUpIcon } from '../icons/icon';

interface ITitleWithIcons {
  title: string;
}

const TitleWithIcons = ({ title }: ITitleWithIcons) => {
  return (
    <>
      <h1 className="text-black text-center text-4xl mt-10 max-sm:text-lg max-md:mt-24 max-sm:mt-28">
        {title}
      </h1>
      <hr className="mt-4  bg-black" />
      <div className="flex mt-4 cursor-pointer">
        <WhatsUpIcon />
        <TwitterIcon />
        <RiddetIcon />
      </div>
    </>
  );
};

export default TitleWithIcons;
