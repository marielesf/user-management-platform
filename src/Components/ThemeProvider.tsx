import { createContext, useState } from 'react';
import { ReactNode } from 'react';

const ThemeContext = createContext({
  theme: 'light',
});

export const ThemeProvider = (children: ReactNode) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
