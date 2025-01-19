import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import { getListUsers } from '../Service/UserService';
import { useEffect } from 'react';
import React from 'react';
import { camelCase } from 'lodash';
import { UserAction } from './UserAction';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { GridPaginationMeta } from '@mui/x-data-grid';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
};

export type ListType = {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

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
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 200,
    renderCell: () => <UserAction />,
  },
];

export default function UserList() {
  const [userList, setUserList] = React.useState<ListType>({
    page: 1,
    per_page: 6,
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
  // const {
  //   isLoading,
  //   rows,
  //   pageInfo: { hasNextPage },
  // } = useQuery(paginationModel);
  // const rowCountRef = React.useRef(userList?.total || 0);

  const navigate = useNavigate();

  async function fetchData(page: number) {
    //const page = userList?.page + 1 || 1;
    const response = await getListUsers(page);

    // for (let i = 2; i < response.total_pages; i++) {
    //   response = await getListUsers(i);
    //   console.log('response: ', response);
    // }
    const obj: User[] = response.data.map((user) =>
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
  }

  useEffect(() => {
    fetchData(userList.page);
  }, []);
  console.log('userList: ', userList);

  return (
    <Box sx={{ width: '100%' }}>
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
        onPaginationMetaChange={(newMeta) => {
          console.log('newMeta: ', newMeta);
          //setHasNextPage(newMeta.hasNextPage);
        }}
        paginationMeta={paginationMeta}
        onPaginationModelChange={async (model) => {
          await fetchData(userList.page);
          console.log('model: ', model);
          setPaginationModel({
            pageSize: userList.per_page,
            page: userList.page,
          });
          console.log('model: ', model);
        }}
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
