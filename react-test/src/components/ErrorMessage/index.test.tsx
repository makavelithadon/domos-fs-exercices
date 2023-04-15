import { render, screen } from '@testing-library/react';

import { ErrorMessage } from '.';

const fakeErrorMessage = 'Provided word "Hello" is not valid.';

describe('ErrorMessage', () => {
  test(`should render correctly
      - with provided 'message' props in the rendered ui
      - and have the correct default className`, () => {
    render(<ErrorMessage message={fakeErrorMessage} />);

    const node = screen.getByText(fakeErrorMessage);

    expect(node).toBeInTheDocument();
    expect(node).toHaveClass('text-red-600 text-left');
  });

  test(`should render correctly
      - with the provided 'className' props appended to container class list`, () => {
    render(<ErrorMessage message={fakeErrorMessage} className="my-custom-class" />);

    expect(screen.getByText(fakeErrorMessage)).toHaveClass('my-custom-class');
  });
});
