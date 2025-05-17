import Header from '../../components/header'
import { PageComponent } from '../../type'
import ImportWalletForm from './import-wallet-form'
import Background from '../../components/bg'

const ImportWallet: PageComponent = (props) => {
  return (
    <div
      className="px-3 flex flex-col justify-between"
      style={{
        height: '600px',
      }}
    >
      <Background className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-[0] pointer-events-none" />
      <Header
        title={'Import Account'}
        withBackButton
        onBackButtonClick={() => {
          props.setPage('home')
        }}
      />
      {<ImportWalletForm {...props} />}
    </div>
  )
}

export default ImportWallet
