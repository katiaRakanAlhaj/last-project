import { useForm } from 'react-hook-form';
import { TLogin } from '../../api/auth/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_login } from '../schema/shcema';
import { useState } from 'react';
import { userApi } from '../../api/auth/api';
import TitleWithIcons from '../title-with-icons';
import { useNavigate } from 'react-router-dom';

interface ILogInInputSide {}

const LogInInputSide = ({}: ILogInInputSide) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: yupResolver(schema_login),
    defaultValues: { email: '', name: '', password: '' },
  });
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const handleFormSubmit = async (data: TLogin) => {
    try {
      const response = await userApi.getUsers();
      const user = response.find((user) => {
        return user.email === data.email && user.password === data.password;
      });
      if (user) {
        const userinfo = { name: user.name, email: user.email };
        localStorage.setItem('user', JSON.stringify(userinfo));
        setLogin('Login successful');
        navigate('/home');
      } else {
        setLogin('Login failed');
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  const inputs = [
    {
      id: 0,
      label: 'Name',
      placeholder: 'name',
      register: { ...register('name') },
      error: errors.name && <p className="error">{errors.name.message}</p>,
    },
    {
      id: 1,
      label: 'Email',
      placeholder: 'email',
      register: { ...register('email') },
      error: errors.email && <p className="error">{errors.email.message}</p>,
    },
    {
      id: 2,
      label: 'password',
      placeholder: 'password',
      register: { ...register('password') },
      error: errors.password && (
        <p className="error">{errors.password.message}</p>
      ),
    },
  ];

  return (
    <div className="flex-1">
      <div className="h-full flex flex-col justify-center items-center w-full">
        <TitleWithIcons title="Sign in to Account" />
        <form
          className="mt-1 lg:w-1/2 w-[80%]"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          {inputs.map((_input) => (
            <>
              <label className="mt-2 font-medium text-black dark:text-white  max-sm:text-xs max-sm:mb-2">
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
            className="mt-6 w-36 h-12 text-center justify-center font-medium text-white focus:outline-none bg-black rounded-full borde max-sm:text-sm max-sm:w-28 max-sm:h-11"
          >
            sign in
          </button>
          <p className="mt-2  text-green-600 font-bold">{login}</p>
        </form>
      </div>
    </div>
  );
};
export default LogInInputSide;
