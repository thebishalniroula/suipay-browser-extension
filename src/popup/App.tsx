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
import Background from './components/bg'
import { Toaster } from 'react-hot-toast'
import SettingsPage from './pages/settings'

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
    component: SettingsPage,
    showFloatingNav: true,
  },
  subscriptions: {
    component: SubscriptionsPage,
    showFloatingNav: true,
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
    <main className="w-[360px] min-h-[600px] bg-[#020304] text-white">
      {!!walletData && (
        <Background className="fixed -bottom-[10%] z-[0] pointer-events-none" width={400} />
      )}
      <PageComponent page={page} setPage={setPage} />
      {showFloatingNav && <FloatingNav active={page} setActive={setPage} />}
      <Toaster />
    </main>
  )
}

export default App
