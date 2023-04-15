import { PropsWithChildren } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { words } from '@mocks/data';
import { server, rest } from '@mocks/server';

import { App } from './App';

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

describe('App', () => {
  beforeAll(() => {
    server.use(
      rest.get(`/words`, (_req, res, ctx) => {
        return res(ctx.status(200), ctx.json<Word[]>([...words.values()]));
      })
    );
  });

  test(`should render correctly
      - with an app title
      - and words rendered in the UI
      - when fetching on /words is complete`, async () => {
    const { container } = render(<App />, { wrapper });

    const appTitle = screen.getByText('Add some words to my list');
    expect(appTitle).toBeInTheDocument();
    expect(appTitle).toHaveClass('text-5xl font-bold mb-7');

    // Expect all the initial words are visible in the UI (['Foo', 'Bar', 'Baz'])
    await waitFor(() =>
      Promise.all(
        [...words.values()].map((word) => expect(screen.getByText(word)).toBeInTheDocument())
      )
    );

    expect(container.querySelector('form')).toBeInTheDocument();
    expect(container.querySelector('.words')).toBeInTheDocument();
    expect(container.querySelector('footer')).toBeInTheDocument();
  });
});
