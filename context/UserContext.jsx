import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    async function login() {

    }
    async function register() {

    }
    async function logout() {

    }
    const getInitialUserValue = async () => {
        try {
            setUser("null");
        } catch (error) {
            setUser(null);
        } finally {
            setAuthChecked(true);
        }
    }
    useEffect(() => {
        getInitialUserValue();
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout, register, setUser,authChecked }}>
            {children}
        </UserContext.Provider>
    )
}