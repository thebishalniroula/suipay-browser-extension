import React from 'react'
import Header from '../../components/header'
import { PageComponent } from '../../type'
import { Button } from '../../components/button'
import CreateWalletForm from './create-wallet-form'
import { useStorage } from '../../../hooks/use-storage'
import { STORAGE_KEYS } from '../../../config/storage-keys'
import { WalletEssentials } from '../../App'
import Background from '../../components/bg'
import RecoveryPhrase from '../../components/recovery-phrase'

const CreateAccount: PageComponent = (props) => {
  const [walletData] = useStorage<WalletEssentials | null>(STORAGE_KEYS.WALLET_ESSENTIALS, null)

  const [seedPhrase, setSeedPhrase] = React.useState({
    phrase: '',
    acknowledged: false,
  })

  const handleSeedPhraseAcknowledged = () => {
    setSeedPhrase({ ...seedPhrase, acknowledged: true })
  }

  return (
    <div
      className="px-3 flex flex-col justify-between"
      style={{
        height: '600px',
      }}
    >
      <Background className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-[0] pointer-events-none" />
      {!seedPhrase.acknowledged && (
        <Header
          title={walletData ? 'Recovery Phrase' : 'Create Account'}
          withBackButton={!walletData}
          onBackButtonClick={() => {
            props.setPage('home')
          }}
        />
      )}
      {/* First step -- ask for username and password */}
      {!seedPhrase.acknowledged && !walletData && (
        <CreateWalletForm
          setSeedPhrase={(phrase) => setSeedPhrase({ phrase, acknowledged: false })}
        />
      )}
      {/* Second step -- show seed phrase */}
      {!seedPhrase.acknowledged && !!walletData && (
        <RecoveryPhrase
          phrase={seedPhrase.phrase}
          handleContinue={handleSeedPhraseAcknowledged}
          className="flex-1"
        />
      )}
      {seedPhrase.acknowledged && (
        <div className="flex-1">
          <div className="flex flex-col h-full py-5 gap-3">
            <div className="p-3 text-center">
              <h3 className="text-2xl font-bold">
                Congrats!
                <br />
                Your wallet is ready
              </h3>
            </div>
            <Button variant="primary" onClick={() => props.setPage('home')} className="mt-auto">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateAccount
