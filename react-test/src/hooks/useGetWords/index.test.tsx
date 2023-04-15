import React, { type PropsWithChildren } from 'react';

import { renderHook, act, waitFor } from '@testing-library/react';

import { useGetWords } from '.';
import { QueryClient, QueryClientProvider } from 'react-query';
import { rest, server } from '@mocks/server';
import { words } from '@mocks/data';

import type { Word } from '@types';

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

describe('useGetWords', () => {
  beforeAll(() => {
    server.use(
      rest.get(`/words`, (_req, res, ctx) => {
        return res(ctx.status(200), ctx.json<Word[]>([...words.values()]));
      })
    );
  });

  test(`should return well formatted words
      - when we fetch the data`, async () => {
    const { result } = renderHook(() => useGetWords(), { wrapper });

    expect(result.current.status).toBe('loading');
    expect(result.current.data).toBe(undefined);

    await waitFor(() => {
      expect(result.current.status).toEqual('success');
    });

    expect(result.current.data).toStrictEqual(['Foo', 'Bar', 'Baz']);
  });
});
