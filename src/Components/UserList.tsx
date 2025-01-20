import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import { editUser, getListUsers } from '../Service/UserService';
import { useContext, useEffect } from 'react';
import React from 'react';
import { camelCase } from 'lodash';
// import { UserAction } from './UserAction';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { GridPaginationMeta } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { deleteUser } from '../Service/UserService';
import { ThemeContext } from 'styled-components';
import { ListType, User } from './Types/UserTypes';

export default function UserList() {
  const [userList, setUserList] = React.useState<ListType>({
    page: 1,
    per_page: 6,
  } as ListType);

  const { theme } = useContext(ThemeContext) || { theme: 'light' };

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: userList.per_page,
    page: 0,
  });
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const paginationMetaRef = React.useRef<GridPaginationMeta>(undefined);

  const paginationMeta = React.useMemo(() => {
    if (
      hasNextPage !== undefined &&
      paginationMetaRef.current?.hasNextPage !== hasNextPage
    ) {
      paginationMetaRef.current = { hasNextPage };
    }
    return paginationMetaRef.current;
  }, [hasNextPage]);

  const navigate = useNavigate();

  const fetchData = React.useCallback(async () => {
    const response = await getListUsers(paginationModel.page + 1);

    const obj: User[] = response.data.map((user: Record<string, unknown>) =>
      Object.keys(user).reduce(
        (result, key) => ({
          ...result,
          [camelCase(key)]: (user as Record<string, unknown>)[key],
        }),
        {} as User,
      ),
    );
    setHasNextPage(response.page < response.total_pages);
    setUserList({
      data: obj,
      page: response.page,
      per_page: response.per_page,
      total: obj.length,
      total_pages: response.total_pages,
    });
  }, [paginationModel.page]);

  const columns: GridColDef<User[][number]>[] = [
    { field: 'id', headerName: 'ID', width: 90, flex: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      sortable: true,
      flex: 100,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      sortable: true,
      flex: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 200,
      editable: true,
      sortable: false,
    },
    {
      field: 'full_name',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 200,
      valueGetter: (value, row) =>
        `${row.firstName || ''} ${row.lastName || ''}`,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 200,
      renderCell: (params) => (
        <div>
          <Button
            type="submit"
            onClick={() => {
              const id = params.row.id;
              setUserList({
                ...userList,
                data: userList.data.filter((user) => user.id !== id),
              });
              editUser(id);
            }}
          >
            <ModeEditOutlineOutlinedIcon />
          </Button>
          <Button
            type="submit"
            onClick={() => {
              const id = params.row.id;
              setUserList({
                ...userList,
                data: userList.data.filter((user) => user.id !== id),
              });
              deleteUser(id);
            }}
          >
            <DeleteIcon className="" />
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      console.log('useEffect - paginationModel', paginationModel);
      await fetchData();
    })();
  }, [fetchData, paginationModel, paginationModel.page]);

  return (
    <Box
      sx={{ width: '100%' }}
      className={`${theme === 'dark' ? 'dark' : 'light'}`}
    >
      <DataGrid
        rows={userList.data}
        {...userList.data}
        paginationMode="server"
        columns={columns}
        paginationModel={paginationModel}
        pageSizeOptions={[6]}
        initialState={{
          pagination: {
            rowCount: -1,
          },
        }}
        paginationMeta={paginationMeta}
        pagination
        onPaginationModelChange={setPaginationModel}
        disableRowSelectionOnClick
      />

      <div>
        <Button
          type="button"
          variant="contained"
          onClick={() => navigate('/signup')}
        >
          New user
        </Button>
      </div>
    </Box>
  );
}
