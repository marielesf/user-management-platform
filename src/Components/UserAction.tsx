import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

export const UserAction = () => {
  return (
    <div>
      <Button type="submit" onClick={() => console.log('Delete')}>
        <ModeEditOutlineOutlinedIcon />
      </Button>
      <Button type="submit" onClick={() => console.log('Delete')}>
        <DeleteIcon className="" />
      </Button>
    </div>
  );
};
