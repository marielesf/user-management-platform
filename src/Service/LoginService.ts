const baseUrl = 'https://reqres.in/api';

export const loginSuccessful = async (
  userName: string,
  password: string,
): Promise<string> => {
  console.log('loginSuccessful', userName, password);
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log('TOKEN: ', data);
    return data;
  } catch (err) {
    console.log('ERROR: ', err);
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(String(err));
    }
    return '';
  }
};
