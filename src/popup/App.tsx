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
import { decryptData, EncryptedData } from '../utils/encryption'
import { STORAGE_KEYS } from '../config/storage-keys'
import Background from './components/bg'
import toast, { Toaster } from 'react-hot-toast'
import SettingsPage from './pages/settings'
import ConfirmationPage from './pages/transaction-confirmation'
import { useDecryptSecretsStore } from '../store/secrets'
import PasswordPrompt from './components/password-prompt'
import { z } from 'zod'
import ImportWallet from './pages/import-wallet'
import { cn } from '../utils/cn'

const pages = [
  'home',
  'create-wallet',
  'create-wallet',
  'import-wallet',
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
  'import-wallet': {
    component: ImportWallet,
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
    accessToken: string
    scwAddress: string
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

  const url = new URLSearchParams(window.location.search)
  const productDataString = url.get('action')
  const productData = z
    .object({
      product_id: z.string(),
      ref_id: z.string(),
    })
    .safeParse(JSON.parse(productDataString ?? '{}'))

  const { privateKey, setPrivateKey } = useDecryptSecretsStore((state) => state)

  const showTransactionConfirmationPage = productData.data?.product_id && productData.data.ref_id

  return (
    <main
      className={cn(
        'w-[360px] min-h-[600px] bg-[#020304] text-white',
        showTransactionConfirmationPage && 'w-full',
      )}
    >
      {!privateKey && walletData && (
        <PasswordPrompt
          onSubmit={(password) => {
            decryptData(walletData!.encrypted.privateKey, password)
              .then(setPrivateKey)
              .catch(() => {
                toast.error('Invalid password')
              })
          }}
        />
      )}
      {!!walletData && (
        <Background className="fixed -bottom-[10%] z-[0] pointer-events-none" width={400} />
      )}
      {showTransactionConfirmationPage && (
        <ConfirmationPage
          productId={productData?.data?.product_id!}
          refId={productData?.data?.ref_id!}
        />
      )}
      {
        <>
          <PageComponent page={page} setPage={setPage} />
          {showFloatingNav && !productData.data?.product_id && (
            <FloatingNav active={page} setActive={setPage} />
          )}
        </>
      }
      <Toaster />
    </main>
  )
}

export default App

const ShowTransferGasToPrimaryWalletPopup = () => {
  return <div></div>
}
