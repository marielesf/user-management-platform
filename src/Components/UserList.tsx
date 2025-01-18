import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import { getListUsers } from '../Service/service';
import { useEffect } from 'react';
import React from 'react';

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
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

export default function UserList() {
  const [userRows, setUserRows] = React.useState<ListType>();

  async function fetchData() {
    setUserRows(await getListUsers());
  }

  useEffect(() => {
    fetchData();
  }, []);
  console.log('userRows: ', userRows);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={userRows?.data || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
