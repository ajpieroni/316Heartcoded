import { render, screen } from '@testing-library/react';
import UserHome from './pages/UserHome';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
