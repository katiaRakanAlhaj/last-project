import { useForm } from 'react-hook-form';
import { TUser } from '../../api/auth/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_signup } from '../schema/shcema';
import { userApi } from '../../api/auth/api';
import TitleWithIcons from '../title-with-icons';
import { Link, useNavigate } from 'react-router-dom';

interface ISignupSide {}

const SignupInputSide = ({}: ISignupSide) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUser>({
    resolver: yupResolver(schema_signup),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });
  const navigate = useNavigate();
  const handleFormSubmit = async (data: TUser) => {
    try {
      await userApi.postUsers(data);
      navigate('/login');
    } catch (err) {
      console.log('error', err);
    }
  };
  const inputs = [
    {
      id: 0,
      label: 'Name',
      placeholder: 'Name',
      register: { ...register('name') },
      error: errors.name && <p className="error">{errors.name.message}</p>,
    },
    {
      id: 1,
      label: 'Email',
      placeholder: 'Email',
      register: { ...register('email') },
      error: errors.email && <p className="error">{errors.email.message}</p>,
    },
    {
      id: 2,
      label: 'Password',
      placeholder: 'Password',
      register: { ...register('password') },
      error: errors.password && (
        <p className="error">{errors.password.message}</p>
      ),
    },
    {
      id: 3,
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      register: { ...register('confirmPassword') },
      error: errors.confirmPassword && (
        <p className="error">{errors.confirmPassword.message}</p>
      ),
    },
  ];

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col justify-center items-center w-full">
        <TitleWithIcons title="Sign in to Account" />
        <form
          className="mt-1 lg:w-1/2 w-[70%]"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          {inputs.map((_input) => (
            <>
              <label className="block mt-2 font-medium text-black dark:text-white  max-sm:text-xs max-sm:mb-2">
                {_input.label}
              </label>
              <input
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 max-sm:h-9"
                type="text"
                placeholder={_input.placeholder}
                {..._input.register}
              />
              {_input.error}
            </>
          ))}
          <div className="flex justify-between mt-2">
            <div className="flex">
              <input
                checked
                id="checked-checkbox"
                type="checkbox"
                className="h-4 mt-3 text-green-600"
              />
              <p className="mt-2 mx-1 font-bold max-sm:text-xs">remember me</p>
            </div>
            <Link to="/reset-email">
              <div className="mt-2 font-bold max-sm:text-xs">
                forget password
              </div>
            </Link>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-6 w-36 h-12 text-center justify-center font-medium text-white focus:outline-none bg-black rounded-full border border-green-600 max-sm:text-xs max-sm:w-28 max-sm:h-8"
            >
              sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignupInputSide;
