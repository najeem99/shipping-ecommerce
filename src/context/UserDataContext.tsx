import React, { createContext, useState, ReactNode } from "react";
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

// Create the provider component
export const UserAuthProvider: React.FC<UserAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<GetUsers | null>( {
        "user": {
          "id": 1,
          "name": "Mirza",
          "phoneNumber": "+971562738467",
          "email": "test@test.com",
          "currency": "AED",
          "language": "en",
          "image": "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png",
          "address": [
            {
              "id": 1,
              "city": "Dubai",
              "country": "UAE",
              "area": "Barsha",
              "building": "Al wasl 203",
              "landmark": "Near mall of the emirates",
              "isDefault": true
            }
          ],
          "password": "12345",
          "orders": [
            {
              "productId": "1",
              "deliveryAddress": "1",
              "paymentMethod": {
                "type": "COD",
                "currency": "AED"
              },
              "baseAmount": "120.00",
              "taxAmount": "6.75",
              "totalAmount": "126.75",
              "currency": "AED"
            }
          ]
        }
      }); // Initialize user state
    const [isSignedIn, setIsSignedIn] = useState(true);

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
