/* eslint-disable @typescript-eslint/no-explicit-any */

import { getUserName } from '../Components/useAuth';

/* eslint-disable @typescript-eslint/no-unused-vars */
const url = 'https://reqres.in/api/users';

export const getListUsers = async () => {
  await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + getUserName(),
    },
  }).then((response) => {
    if (response.status === 200) {
      response.json().then((result) => {
        console.log(result);
        return result;
      });
    } else {
      return;
    }
  });
};

export const addPosts = async (title: any, body: any) => {
  await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      body: body,
      userId: Math.random().toString(36).slice(2),
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // setPosts((posts: any) => [data, ...posts]);
      // setTitle('');
      // setBody('');
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const deletePost = async (id: any) => {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
  }).then((response) => {
    if (response.status === 200) {
      // setPosts(
      //   posts.filter((post: { id: any }) => {
      //     return post.id !== id;
      //   }),
      // );
    } else {
      return;
    }
  });
};
