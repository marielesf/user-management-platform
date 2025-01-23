import { useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';

export default function ToggleSwitch() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark' ? true : false,
  );

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    console.log('APM LOG - IsDark', e.target.checked);
    if (!isDark) localStorage.setItem('theme', 'dark');
    else localStorage.setItem('theme', 'light');

    setIsDark(!isDark);
  }

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <StyledLabel htmlFor="checkbox" checked={isDark}>
      <input
        id="checkbox"
        type="checkbox"
        checked={isDark}
        onChange={handleOnChange}
      />
    </StyledLabel>
  );
}

const StyledLabel = styled.label<{ checked: boolean }>`
  cursor: pointer;
  text-indent: -9999px;
  width: 100px;
  height: 40px;
  background: ${({ checked }) => (checked ? 'gray' : 'blue')};
  display: block;
  border-radius: 100px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: ${({ checked }) => (checked ? '4px' : 'calc(65% - 2px)')};
    top: 5px;
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }
`;
