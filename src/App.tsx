import './App.css';
import styled from 'styled-components';
import AppRoutes from './Components/AppRoutes';
import { useState } from 'react';
import { User } from './Components/Types/UserTypes';
import { AppContext } from './context/Context';
import ToggleSwitch from './Components/ToggleSwitch';

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const dispatchUserEvent = (actionType: string, newUser: User) => {
    switch (actionType) {
      case 'ADD_USER':
        console.log('APP -> ADD_USER', newUser);

        setUsers([...users, newUser]);
        return;
      case 'REMOVE_USER':
        console.log('APP -> REMOVE_USER', newUser);
        console.log('APP -> REMOVE_USER2', users);
        setUsers(users.filter((user) => user.id !== newUser.id));
        console.log(
          'APP -> REMOVE_USER3',
          users.filter((user) => {
            console.log('APP -> REMOVE_USER4', user);
            console.log('APP -> REMOVE_USER7', newUser);
            return user.id !== newUser.id;
          }),
        );
        return;
      case 'EDIT_USER': {
        console.log('APP -> EDIT_USER - users', newUser);

        setUsers([...users, newUser]);

        return;
      }
      default:
        return;
    }
  };

  const addAllUsers = (users: User[]) => {
    setUsers(users);
  };

  return (
    <div className="App">
      <ToggleContainer>
        <ToggleSwitch />
      </ToggleContainer>
      <AppContext.Provider
        value={{
          users,
          dispatchUserEvent,
          addAllUsers,
        }}
      >
        <AppRoutes />
      </AppContext.Provider>
    </div>
  );
}

export default App;

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: right;
  margin: 0;
  height: 10%;
`;
