import { type PropsWithChildren } from 'react';

import { renderHook, act, waitFor } from '@testing-library/react';

import { usePostWords } from '.';
import { QueryClient, QueryClientProvider } from 'react-query';
import { rest, server } from '@mocks/server';
import type { Word } from '@types';
import { BadRequestError } from '@mocks/handlers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('usePostWords', () => {
  beforeAll(() => {
    server.use(
      rest.post(`/words`, async (req, res, ctx) => {
        const args = await req.json();
        const words = args.words as Word[];

        return res(ctx.status(201), ctx.json<Word[]>(words));
      })
    );
  });

  test(`should return well formatted posted words
      - when we POST new words
      - and the server responds with 201 status code`, async () => {
    const onSuccessMock = jest.fn();
    const { result } = renderHook(() => usePostWords({ onSuccess: onSuccessMock }), { wrapper });

    expect(result.current.status).toBe('idle');
    expect(result.current.data).toBe(undefined);

    act(() => result.current.mutate(['hello', 'world']));

    await waitFor(() => expect(result.current.status).toBe('success'));

    expect(onSuccessMock).toHaveBeenNthCalledWith(1, ['hello', 'world']);
  });

  test(`should throw error
      - when we POST new words
      - and the server responds with an error (4xx or 5xx status codes)`, async () => {
    server.use(
      rest.post(`/words`, async (_req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json<BadRequestError>({
            error: 'BadRequest',
            message: 'oops',
            status: 400,
          })
        );
      })
    );

    const onSuccessMock = jest.fn();
    const { result } = renderHook(() => usePostWords({ onSuccess: onSuccessMock }), { wrapper });

    act(() => result.current.mutate(['##hello', '$']));

    await waitFor(() => expect(result.current.status).toBe('error'));

    expect(onSuccessMock).not.toHaveBeenCalled();
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toStrictEqual({
      error: 'BadRequest',
      message: 'oops',
      status: 400,
    });
  });
});
