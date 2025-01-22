export const setLocalStorage = (name: string, access_token: string) => {
  localStorage.setItem('user', name);
  localStorage.setItem(`access_token: `, `${JSON.stringify(access_token)}`);
};

export const getUserName = () => {
  return localStorage.getItem('user');
};

export const pageRedirect = (page: string) => {
  console.info('pageRedirect');
  switch (page) {
    case 'login':
      if (getUserName()) {
        console.info('GO TO home');
        window.location.href = '/';
      } else {
        console.info('GO TO login');
        window.location.href = '/login';
      }
      break;
    case 'signup':
      window.location.href = '/signup';
      break;
    case 'home':
      if (getUserName()) {
        console.info('GO TO home');
        window.location.href = '/';
      } else {
        console.info('GO TO login');
        window.location.href = '/login';
      }
      break;
    default:
      window.location.href = '/notfound';
      break;
  }
};
