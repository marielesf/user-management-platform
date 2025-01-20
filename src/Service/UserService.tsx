/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListType } from '../Components/Types/UserTypes';
import { getUserName } from '../Components/useAuth';

/* eslint-disable @typescript-eslint/no-unused-vars */
const baseUrl = 'https://reqres.in/api/users';

export const getListUsers = async (page: number): Promise<ListType> => {
  const response = await fetch(baseUrl + `?page=${page}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + getUserName(),
    },
  });

  if (response.status === 200) {
    const result = await response.json();
    console.log('result: ', result);
    return result;
  } else {
    return {} as ListType;
  }
};

export const deleteUser = async (id: number) => {
  fetch(baseUrl + `/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + getUserName(),
    },
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err.message);
    });
};

export const editUser = async (id: any) => {
  await fetch(`${baseUrl}/?${id}`, {
    method: 'PUT',
  }).then((response) => {
    if (response.status === 200) {
      console.log('SERVICE - edit user ', id);
    } else {
      return;
    }
  });
};
