import { createContext } from 'react';
import { User } from '../Components/Types/UserTypes';

interface AppContextType {
  users: User[];
  dispatchUserEvent: (actionType: string, newUser: User) => void;
  theme?: boolean;
  dispatchThemeEvent?: (toogle: boolean) => void;
  addAllUsers: (users: User[]) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
