import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { SetupWorkerApi } from 'msw';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

const prepare = async (): Promise<ReturnType<SetupWorkerApi['start']>> => {
  const { worker } = await import('./mocks/browser');

  return worker.start();
};

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      {/* // Provide the client to your App */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
});
