import axios from "axios";
import { createContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

export const UserContext = createContext();
const BASE_URL = 'http://192.168.1.9:8000/api';

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

    async function login(username, password) {
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                username,
                password,
            });

            const { token, token_type, user } = response.data;
            const authToken = `${token_type} ${token}`;

            await SecureStore.setItemAsync('token', authToken);
            setUser(user);
        } catch (error) {
            console.error("Login error:", error?.response?.data || error.message);
            throw error;
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
                const type = match ? `image/${match[1]}` : `image/jpeg`;
                formData.append('image', {
                    uri: image,
                    name: filename,
                    type,
                });
            }

            const response = await axios.post(`${BASE_URL}/create-user`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Registration successful!');
            return true;
        } catch (error) {
            if (error.response?.status === 422) {

                const errors = error.response.data.errors;
                const errorMsg = Object.values(errors).flat().join('\n');
                alert(errorMsg);
            } else {
                alert('Registration failed');
                console.error(error);
            }
            return false;
        }
    }

    const getInitialUserValue = async () => {
        try {
            const token = await SecureStore.getItemAsync('token') || null;
            if (!token) {
                setUser(null);
                return;
            }

            const response = await axios.get(`${BASE_URL}/user`, {
                headers: {
                    Authorization: token,
                },
            });

            setUser(response.data);
        } catch (error) {
            console.error("Token check failed:", error?.response?.data || error.message);
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
