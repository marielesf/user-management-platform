import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import Signup from './Signup';

test('renders name', async () => {
  const { getByText } = render(<Signup />);

  expect(getByText('Sign Up')).toBeDefined();

  // await expect.element(getByText('Hello Vitest x2!')).toBeInTheDocument()
});
