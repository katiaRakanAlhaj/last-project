import { useForm } from 'react-hook-form';
import { TPassword } from '../../api/auth/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_password } from '../schema/shcema';
import { userApi } from '../../api/auth/api';
import TitleWithIcons from '../title-with-icons';
import { useNavigate, useLocation } from 'react-router-dom';

interface IResetPasswordInputSide {}

const ResetPasswordInputSide = ({}: IResetPasswordInputSide) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPassword>({
    resolver: yupResolver(schema_password),
    defaultValues: { password: '', newpassword: '' },
  });
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.pathname.split('/')[2];

  const handleResetPassword = async (data: TPassword) => {
    try {
      const response = await userApi.getUsers();
      const user = response.find((_user) => _user.email === email);
      if (user) {
        await userApi.resetPassword({
          password: data.password,
          email: email,
          confirmPassword: data.newpassword,
          id: user?.id,
          name: user?.name,
        });
        navigate('/login');
        console.log('user', user);
      } else {
        console.log('User not found');
      }
    } catch (err) {
      console.log('eee', err);
    }
  };
  const inputs = [
    {
      id: 0,
      label: 'Password',
      placeholder: 'Password',
      register: { ...register('password') },
      error: errors.password && (
        <p className="error">{errors.password.message}</p>
      ),
    },
    {
      id: 1,
      label: 'New Password',
      placeholder: 'email',
      register: { ...register('newpassword') },
      error: errors.newpassword && (
        <p className="error">{errors.newpassword.message}</p>
      ),
    },
  ];

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col justify-center items-center w-full">
        <TitleWithIcons title="Sign in to Account" />
        <form
          className="mt-1 lg:w-1/2 w-[70%]"
          onSubmit={handleSubmit(handleResetPassword)}
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
          <button
            type="submit"
            className="mt-6 w-36 h-12 text-center justify-center font-medium text-white focus:outline-none bg-black rounded-full border  max-sm:text-xs max-sm:w-28 max-sm:h-8"
          >
            sign in
          </button>
        </form>
      </div>
    </div>
  );
};
export default ResetPasswordInputSide;
