import React from 'react'
import Header from '../../components/header'
import { PageComponent } from '../../type'
import { Button } from '../../components/button'
import Input from '../../components/input'

const MOCK_SEED_PHRASE =
  'abandon ability able about above absent absorb abstract absurd abuse access accident'

const CreateAccount: PageComponent = (props) => {
  const [seedPhrase, setSeedPhrase] = React.useState<Array<string>>([])

  const [walletReady, setWalletReady] = React.useState(false)

  const handleSubmit = () => {
    // Handle account creation logic here
    console.log('Account created')
    console.log('Seed Phrase:', seedPhrase)
    setSeedPhrase(MOCK_SEED_PHRASE.split(' '))
  }

  const handleSeedPhraseSubmit = () => {
    // Handle seed phrase submission logic here
    console.log('Seed Phrase submitted')
    setWalletReady(true)
  }

  return (
    <div
      className="px-3 flex flex-col justify-between"
      style={{
        height: '600px',
      }}
    >
      {!walletReady && (
        <Header
          title={seedPhrase.length ? 'Recovery Phrase' : 'Create Wallet'}
          withBackButton={!seedPhrase.length}
          onBackButtonClick={() => {
            props.setPage('home')
          }}
        />
      )}
      {/* First step -- ask for username and password */}
      {!walletReady && !seedPhrase.length && (
        <div className="flex-1">
          <div className="flex flex-col h-full py-5">
            <div className="flex-1 flex flex-col items-center justify-center gap-2">
              <div>
                <h2 className="text-2xl text-center mb-1">Create a password</h2>
                <p className="text-center text-md">You will use this to unlock your wallet.</p>
              </div>

              <Input placeholder="Password" />
              <Input placeholder="Confirm Password" />
              <p className="text-red-500">Passwords do not match.</p>
            </div>

            <Button variant="primary" onClick={handleSubmit}>
              Continue
            </Button>
          </div>
        </div>
      )}
      {/* Second step -- show seed phrase */}
      {!walletReady && !!seedPhrase.length && (
        <div className="flex-1">
          <div className="flex flex-col h-full py-5 gap-3">
            <div className="p-3 text-center">
              <h3 className="text-lg text-red-300">Do not share your Recovery phrase!</h3>
              <p className="text-md">
                If someone has your Recovery Phrase they will have full control of your wallet.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {seedPhrase.map((word, index) => (
                <div
                  key={index}
                  className="border border-white/10 rounded-lg p-2 text-center text-white h-10"
                >
                  {index + 1}. {word}
                </div>
              ))}
            </div>
            <Button variant="primary" onClick={handleSeedPhraseSubmit} className="mt-auto">
              Continue
            </Button>
          </div>
        </div>
      )}
      {walletReady && (
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
