
import axios from 'axios';
import { UserType } from '../types/UserTypes';

//API get request to retrive mock users

const API_BASE_URL = 'https://cf4428ba85ba47a0990fd0e8d3ded5dc.api.mockbin.io/';
const LOCAL_STORAGE_KEY = 'lendsqrUsersData';
const CACHE_MINUTES = 60;
export const getUsers = async (): Promise<UserType[]> => {
  const cachedData = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (cachedData) {
    try {
      const { data, timestamp } = JSON.parse(cachedData);
      const now = new Date().getTime();
      const expirationTime = timestamp + CACHE_MINUTES * 60 * 1000; 

      if (now < expirationTime) {
        return data as UserType[];
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY); 
      }
    } catch (e) {
      console.error('Error:', e);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }

  try {
    const response = await axios.get<UserType[]>(`${API_BASE_URL}/users`);
    const users = response.data;

    if (!users || users.length === 0) {
      return [];
    }
    const dataToCache = {
      data: users,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToCache));
    return users;
  } catch (error) {
    console.error('Error1', error);
 if (axios.isAxiosError(error)) {
      throw new Error(`Errrror ${error.message}`);
    } else {
      throw new Error('Error2');
    }
  }
};