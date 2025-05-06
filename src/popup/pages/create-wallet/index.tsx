import React from 'react'
import Header from '../../components/header'
import { PageComponent } from '../../type'
import { Button } from '../../components/button'
import CreateWalletForm from './create-wallet-form'
import { useStorage } from '../../../hooks/use-storage'
import { STORAGE_KEYS } from '../../../config/storage-keys'
import { WalletEssentials } from '../../App'

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
      {!seedPhrase.acknowledged && (
        <Header
          title={walletData ? 'Recovery Phrase' : 'Create Wallet'}
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
        <div className="flex-1">
          <div className="flex flex-col h-full py-5 gap-3">
            <div className="p-3 text-center">
              <h3 className="text-lg text-red-300">Do not share your Recovery phrase!</h3>
              <p className="text-md">
                If someone has your Recovery Phrase they will have full control of your wallet.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {seedPhrase.phrase.split(' ').map((word, index) => (
                <div
                  key={index}
                  className="border border-white/10 rounded-lg p-2 text-center text-white h-10"
                >
                  {index + 1}. {word}
                </div>
              ))}
            </div>
            <Button variant="primary" onClick={handleSeedPhraseAcknowledged} className="mt-auto">
              Continue
            </Button>
          </div>
        </div>
      )}
      {seedPhrase.acknowledged && (
        <div className="flex-1">
          <div className="flex flex-col h-full py-5 gap-3">
            <div className="p-3 text-center">
              <h3 className="text-lg text-green-300">
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
