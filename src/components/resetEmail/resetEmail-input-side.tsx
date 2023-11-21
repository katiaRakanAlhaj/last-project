import { useForm } from 'react-hook-form';
import { TEmail } from '../../api/auth/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_email } from '../schema/shcema';
import { userApi } from '../../api/auth/api';
import TitleWithIcons from '../title-with-icons';
import { useNavigate, Link } from 'react-router-dom';

interface IResetEmailInputSide {}

const ResetEmailInputSide = ({}: IResetEmailInputSide) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEmail>({
    resolver: yupResolver(schema_email),
    defaultValues: { email: '' },
  });

  const navigate = useNavigate();

  const handleFormSubmit = async (data: TEmail) => {
    try {
      const response = await userApi.getUsers();
      const emailExists = response.find(
        (user: TEmail) => user.email === data.email
      );
      if (emailExists) {
        navigate(`/reset-password/${data.email}`);
      } else {
        console.log('Email not found');
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col justify-center items-center w-full">
        <TitleWithIcons title="Sign in to Account" />

        <form
          className="mt-1 lg:w-1/2 w-[70%]"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <label className="block mt-2 font-medium text-black dark:text-white  max-sm:text-xs max-sm:mb-2">
            Email
          </label>
          <input
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 max-sm:h-9"
            type="text"
            placeholder="email"
            {...register('email')}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
          <div className="flex justify-between">
            <button
              type="submit"
              className="mt-6 w-36 h-12 text-center justify-center font-medium text-white focus:outline-none bg-black rounded-full border max-sm:text-xs max-sm:w-28 max-sm:h-8"
            >
              check email
            </button>
            <Link to="/login">
              <button
                type="submit"
                className="mt-6 w-36 h-12 text-center justify-center font-medium text-white focus:outline-none bg-black rounded-full border max-sm:text-sm max-sm:w-28 max-sm:h-8"
              >
                back to sign in
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ResetEmailInputSide;
