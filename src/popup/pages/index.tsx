import { cn } from '../../utils/cn'
import { Button } from '../components/button'
import { PageComponent } from '../type'

const HomePage: PageComponent = (props) => {
  return (
    <div className="flex flex-col p-8 gap-4" style={{ height: '600px' }}>
      <div className={cn('flex-1', 'flex items-center justify-center text-3xl font-bold')}>
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
