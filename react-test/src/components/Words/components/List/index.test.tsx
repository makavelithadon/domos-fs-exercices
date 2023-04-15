import { render, screen } from '@testing-library/react';
import { List } from '.';

describe('List', () => {
  test(`should render correctly
      - with 'words' array props rendered as listitem for each word`, () => {
    render(<List words={['Hello', 'World']} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
  });
});
