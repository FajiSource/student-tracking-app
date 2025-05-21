import { createContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'http://192.168.1.9:8000/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  async function login(username, password) {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });

      const { token, token_type } = response.data;
      const authToken = `${token_type} ${token}`;

      await SecureStore.setItemAsync('token', authToken);

      const userResponse = await axios.get(`${BASE_URL}/user`, {
        headers: {
          Authorization: authToken,
        },
      });

      setUser(userResponse.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials");
      } else {
        alert("Login failed");
        console.error(error);
      }
    }
  }

  async function register({ fName, lName, username, password, role, image }) {
    try {
      const formData = new FormData();
      formData.append('fName', fName);
      formData.append('lName', lName);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('role', role);

      if (image) {
        const filename = image.split('/').pop();
        const match = /\.(\w+)$/.exec(filename ?? '');
        const type = match ? `image/${match[1]}` : `image`;

        formData.append('image', {
          uri: image,
          name: filename,
          type,
        });
      }

      await axios.post(`${BASE_URL}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Registration successful!');
      return true;
    } catch (error) {
      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        let errorMsg = Object.values(errors).flat().join('\n');
        alert(errorMsg);
      } else {
        alert('Registration failed');
        console.error(error);
      }
      return false;
    }
  }

  async function logout() {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (!token) {
        alert('No user token found');
        return;
      }

      await axios.post(`${BASE_URL}/logout`, null, {
        headers: {
          Authorization: token,
        },
      });

      await SecureStore.deleteItemAsync('token');
      setUser(null);
      alert('Logout successful');
    } catch (error) {
      console.error("Logout error:", error?.response?.data || error.message);
      alert('Logout failed');
    }
  }

  const getInitialUserValue = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('token');

      if (storedToken) {
        const response = await axios.get(`${BASE_URL}/user`, {
          headers: {
            Authorization: storedToken,
          },
        });

        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Token invalid or error checking token:", error);
      await SecureStore.deleteItemAsync('token');
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    getInitialUserValue();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, register, setUser, authChecked }}>
      {children}
    </UserContext.Provider>
  );
};
