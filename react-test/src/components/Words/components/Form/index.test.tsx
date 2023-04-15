import type { PropsWithChildren } from 'react';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';

import * as usePostWordsModule from '@hooks/usePostWords';

import { Form } from '.';

const postWordsSpy = jest.spyOn(usePostWordsModule, 'usePostWords') as jest.Mock;

const queryClient = new QueryClient();

const wrapper = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('Form', () => {
  test(`should render correctly
      - with a form element tag
      - with an inputText element tag
      - with a submit button element tag`, () => {
    postWordsSpy.mockImplementation(() => ({
      isLoading: false,
    }));

    const { container } = render(<Form />, { wrapper });
    const form = container.querySelector('form')! as HTMLFormElement;

    expect(form).toBeInTheDocument();

    const inputText = within(form).getByRole('textbox');

    expect(inputText).toBeInTheDocument();
    expect(inputText).toHaveAttribute('name', 'words');
    expect(inputText).toHaveValue('');

    const submitButton = within(container).getByRole('button');

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
    expect(submitButton).not.toHaveAttribute('disabled');
  });

  test(`should render a disabled submit button`, () => {
    postWordsSpy.mockImplementation(() => ({
      isLoading: true,
    }));

    const { container } = render(<Form />, { wrapper });

    const submitButton = within(container).getByRole('button');

    expect(submitButton).toHaveAttribute('disabled');
  });

  test(`should trigger a POST on /words route
      - when the form is submitted
      - and the text input is filled
      - and the value is correct
      - then the inputText value should be reset`, async () => {
    let onSuccessBind: () => void;
    const mutateFn = jest.fn(() => onSuccessBind());
    postWordsSpy.mockImplementation(({ onSuccess }) => {
      onSuccessBind = onSuccess;

      return {
        isLoading: false,
        mutate: mutateFn,
        error: undefined,
      };
    });

    const { container } = render(<Form />, { wrapper });

    const form = container.querySelector('form')! as HTMLFormElement;
    const inputText = within(form).getByRole('textbox')! as HTMLInputElement;
    const submitButton = within(container).getByRole('button');

    expect(inputText).toHaveValue('');

    await userEvent.type(inputText, '     ');
    await userEvent.click(submitButton);

    expect(mutateFn).not.toHaveBeenCalled();

    await userEvent.type(inputText, 'Hello World');
    await userEvent.click(submitButton);

    expect(mutateFn).toHaveBeenNthCalledWith(1, ['Hello', 'World']);
    expect(inputText.value).toBe('');
  });

  test(`should render an error below the text input
      - when the POST on /words route
      - responds with an error
      - and change styles from the text input to highlight that something went wrong`, () => {
    postWordsSpy.mockImplementation(() => ({
      error: {
        error: 'BadRequest',
        message: 'Duplicated word: "Hello".',
        status: 400,
      },
    }));

    const { container } = render(<Form />, { wrapper });
    const form = container.querySelector('form')! as HTMLFormElement;
    const inputText = within(form).getByRole('textbox')! as HTMLInputElement;
    const errorElement = within(form).getByText('Duplicated word: "Hello".');

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('text-red-600 text-left flex-basis--full');
    expect(inputText).toHaveClass('text-red-900');
  });
});
