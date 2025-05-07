import { cn } from '../../utils/cn'
import Background from '../components/bg'
import { Button } from '../components/button'
import { PageComponent } from '../type'

const HomePage: PageComponent = (props) => {
  return (
    <div className="flex flex-col p-8 gap-4" style={{ height: '600px' }}>
      <div className={cn('flex-1', 'flex items-center justify-center text-[78px] font-bold')}>
        <Background className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-[0] pointer-events-none" />
        SuiPay
      </div>
      <div className="flex flex-col gap-2">
        <Button
          variant="primary"
          onClick={() => {
            props.setPage('create-wallet')
          }}
        >
          Create New Wallet
        </Button>
        <Button variant="secondary">Import Seed Phrase</Button>
      </div>
    </div>
  )
}

export default HomePage
