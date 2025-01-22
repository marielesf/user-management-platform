const baseUrl = 'https://reqres.in/api';

export const loginSuccessful = async (
  userName: string,
  password: string,
): Promise<string> => {
  try {
    const response = await fetch(`${baseUrl}/register`, {
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

export const doRegister = async (
  userName: string,
  password: string,
): Promise<string> => {
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
