import React, { createContext, useState, ReactNode, useContext } from "react";
import { GetUsers } from "../types/user";

// // Define the shape of the user object
// interface User {
//     name: string
//     email: string
//     password: string
//   }

// Define the context value shape
interface UserDataContextType {
    user: GetUsers | null; // User can be null or a User object
    setUserData: (value: GetUsers) => void;
    signOut: () => void;
    isSignedIn:boolean;
}

// Define the provider props
interface UserAuthProviderProps {
    children: ReactNode; // Define children as ReactNode
}

// Create the context with a default value
export const UserDataContext = createContext<UserDataContextType | null>(null);

export const useUserData = () => {
  return useContext(UserDataContext);
};

// Create the provider component
export const UserAuthProvider: React.FC<UserAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<GetUsers | null>( null); // Initialize user state
    const [isSignedIn, setIsSignedIn] = useState(false);

    const setUserData = (value: GetUsers) => {
        setUser(value);
        setIsSignedIn(true);
    };

    const signOut = () => {
        setUser(null);
        setIsSignedIn(false); // Optionally reset isSignedIn
    };

    return (
        <UserDataContext.Provider
            value={{ user, setUserData, signOut,isSignedIn }}
        >
            {children}
        </UserDataContext.Provider>
    );
};
