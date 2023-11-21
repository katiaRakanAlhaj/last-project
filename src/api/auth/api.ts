import axios from 'axios';
import { IResetPassword, TLogin, TUser } from './interfaces';
import { USER_ROUTE } from './route';

const getUsers = async () => {
  const { data } = await axios.get<TLogin[]>(USER_ROUTE.GET_ALL_USERS);
  return data;
};
const postUsers = async (data: TUser) => {
  const { data: responseData } = await axios.post<TUser>(
    USER_ROUTE.POST_USER,
    data
  );
  return responseData;
};

const resetPassword = async (payload: IResetPassword) => {
  const { data } = await axios.put(
    `${USER_ROUTE.POST_USER}/${payload.id}`,
    payload
  );
  return data;
};

export const userApi = {
  getUsers,
  postUsers,
  resetPassword,
};
