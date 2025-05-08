import Header from '../../components/header'
import { PageComponent } from '../../type'
import Input from '../../components/input'
import { Button } from '../../components/button'

const SendSuiPage: PageComponent = (props) => {
  return (
    <div className="px-3 flex flex-col" style={{ height: '600px' }}>
      <Header
        title="Send Sui"
        withBackButton
        onBackButtonClick={() => {
          props.setPage('home')
        }}
        className="mb-10"
      />
      <div className="h-24 w-24 rounded-full mb-8 flex justify-center items-center mx-auto relative">
        <img src="img/sui-logo.png" className="absolute inset-0 object-center" />
      </div>
      <div className="flex flex-col gap-2">
        <Input placeholder="Recipient’s Wallet Address" />
        <Input placeholder="Amount" />
        <p className="text-right font-normal">Available: 55.544 SUI</p>
      </div>
      <div className="mt-auto flex gap-2 py-4">
        <Button variant="secondary" className="flex-1">
          Cancel
        </Button>
        <Button variant="primary" className="flex-1">
          Send
        </Button>
      </div>
    </div>
  )
}

export default SendSuiPage
