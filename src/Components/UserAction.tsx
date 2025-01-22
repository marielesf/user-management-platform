import { useContext } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { AppContext } from '../context/Context';

import { User } from './Types/UserTypes';
import { useNavigate } from 'react-router-dom';

export const UserAction = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error('AppContext is undefined');
  }
  const { dispatchUserEvent } = appContext;

  const handleRemoveUser = (user: User) => {
    dispatchUserEvent('REMOVE_USER', user);
  };

  const handleEditUser = (user: User) => {
    navigate('/signup?edit=true&userId=' + user.id);
    //dispatchUserEvent('EDIT_USER', user);
  };

  return (
    <div>
      <Button type="submit" onClick={() => handleEditUser(user)}>
        <ModeEditOutlineOutlinedIcon />
      </Button>
      <Button
        type="submit"
        onClick={() => {
          console.log('handleRemoveUser ->', user);

          handleRemoveUser(user);
        }}
      >
        <DeleteIcon className="" />
      </Button>
    </div>
  );
};
