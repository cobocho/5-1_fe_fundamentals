import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

async function enableMocking() {
  const { worker } = await import('./mocks/browser');
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </NuqsAdapter>
    </React.StrictMode>,
  );
});
