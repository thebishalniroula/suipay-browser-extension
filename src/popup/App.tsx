import React, { useState } from 'react'
import HomePage from './pages'
import CreateAccount from './pages/create-wallet'
import { PageComponent } from './type'
import DashboardPage from './pages/dashboard'
import SendSuiPage from './pages/send-sui'
import TempDepositAddressPage from './pages/temp-deposit-address'
import FloatingNav from './components/floating-nav'
import SubscriptionsPage from './pages/subscriptions'
import { useStorage } from '../hooks/use-storage'
import { EncryptedData } from '../utils/encryption'
import { STORAGE_KEYS } from '../config/storage-keys'

const pages = [
  'home',
  'create-wallet',
  'send-sui',
  'temp-deposit-address',
  'subscriptions',
  'settings',
] as const

export type PageName = (typeof pages)[number]

const getPageComponents: (isAddressSetup: boolean) => Record<
  PageName,
  {
    component: PageComponent
    showFloatingNav?: boolean
  }
> = (isAddressSetup) => ({
  home: {
    component: isAddressSetup ? DashboardPage : HomePage,
    showFloatingNav: isAddressSetup,
  },
  'create-wallet': {
    component: CreateAccount,
  },
  'send-sui': {
    component: SendSuiPage,
  },
  'temp-deposit-address': {
    component: TempDepositAddressPage,
  },

  settings: {
    component: () => <div>Settings</div>,
  },
  subscriptions: {
    component: SubscriptionsPage,
  },
})

export type WalletEssentials = {
  plain: {
    address: string
    publicKey: string
  }
  encrypted: {
    privateKey: EncryptedData
    mnemonic: EncryptedData
  }
}

const App = () => {
  const [page, setPage] = useState<PageName>('home')

  const [walletData] = useStorage<WalletEssentials | null>(STORAGE_KEYS.WALLET_ESSENTIALS, null)
  const { showFloatingNav, component: PageComponent } = getPageComponents(!!walletData)[page]

  return (
    <main className="min-w-[360px] min-h-[600px] bg-black text-white">
      <PageComponent page={page} setPage={setPage} />
      {showFloatingNav && <FloatingNav active={page} setActive={setPage} />}
    </main>
  )
}

export default App
