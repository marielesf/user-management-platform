import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import { getListUsers } from '../Service/UserService';
import { useContext, useEffect } from 'react';
import React from 'react';
import { camelCase } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { GridPaginationMeta } from '@mui/x-data-grid';
import { ListType, User } from './Types/UserTypes';
import { UserAction } from './UserAction';
import { AppContext } from '../context/Context';

export default function UserList() {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error('AppContext is undefined');
  }
  const { addAllUsers, users } = appContext;

  const [userList, setUserList] = React.useState<ListType>({
    page: 1,
    per_page: 6,
    data: users,
  } as ListType);

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
    addAllUsers(obj);
  }, [paginationModel.page, addAllUsers]);

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
        <UserAction
          user={{
            // params,
            id: params.row.id as number,
            firstName: params.row.firstName as string,
            lastName: params.row.lastName as string,
            email: params.row.email as string,
            fullName: params.row.fullName as string,
          }}
        ></UserAction>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [paginationModel, paginationModel.page]);

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={users}
        {...users}
        // rowCount={userList?.total}
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
