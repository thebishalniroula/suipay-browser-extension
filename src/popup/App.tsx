import React, { useState } from 'react'
import HomePage from './pages'
import CreateAccount from './pages/create-wallet'
import { PageComponent } from './type'
import DashboardPage from './pages/dashboard'
import SendSuiPage from './pages/send-sui'
import TempDepositAddressPage from './pages/temp-deposit-address'
import FloatingNav from './components/floating-nav'
import SubscriptionsPage from './pages/subscriptions'

const pages = [
  'home',
  'create-wallet',
  'send-sui',
  'temp-deposit-address',
  'subscriptions',
  'settings',
] as const

export type PageName = (typeof pages)[number]

const isAddressSetup = true

const PageComponents: Record<
  PageName,
  {
    component: PageComponent
    showFloatingNav?: boolean
  }
> = {
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
}

const App = () => {
  const [page, setPage] = useState<PageName>('home')

  const { showFloatingNav, component: PageComponent } = PageComponents[page]
  return (
    <main
      style={{
        minWidth: '360px',
        minHeight: '600px',
        backgroundColor: 'black',
        color: 'white',
      }}
    >
      <PageComponent page={page} setPage={setPage} />
      {showFloatingNav && <FloatingNav active={page} setActive={setPage} />}
    </main>
  )
}

export default App
