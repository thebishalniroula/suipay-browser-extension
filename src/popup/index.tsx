import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SuiClientProvider } from '@mysten/dapp-kit'

const queryClient = new QueryClient()

const networks = {
  testnet: { url: 'https://fullnode.testnet.sui.io:443' },
}

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        <App />
      </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
