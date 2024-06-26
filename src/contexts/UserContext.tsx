import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface InfoUser {
    token: string;
    role: string;
}

interface UserContextProviderProps {
    children: ReactNode;
}

type UserContextType = [InfoUser | null, Dispatch<SetStateAction<InfoUser | null>>];

const UserContext = createContext<UserContextType | undefined>(undefined);

// Context.Provider
export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<InfoUser | null>(() => {
        const userStorage = localStorage.getItem('userStorage');
        if (userStorage) {
            const parsedUser = JSON.parse(userStorage);
            const token = parsedUser?.token;
            const role = parsedUser?.role;
            if (token && role) {
                return { token, role };
            }
        }
        return null;
    });

    useEffect(() => {
        localStorage.setItem('userStorage', JSON.stringify(user));
    }, [user]);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
}

// Context.Consumer
export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
}