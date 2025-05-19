import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user,setUser] = useState("owen");

    async function login(){

    }
    async function register(){

    }
    async function logout(){

    }

    return(
        <UserContext.Provider value={{user,login,logout,register,setUser}}>
            {children}
        </UserContext.Provider>
    )
}