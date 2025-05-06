import { Button } from '../../components/button'
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io'
import { TbMenuDeep } from 'react-icons/tb'
import { PageComponent } from '../../type'
import { useStorage } from '../../../hooks/use-storage'
import { WalletEssentials } from '../../App'
import { STORAGE_KEYS } from '../../../config/storage-keys'
import useGetBalance from '../../../hooks/use-get-balance'

const Balance = () => {
  const [data] = useStorage<WalletEssentials | null>(STORAGE_KEYS.WALLET_ESSENTIALS, null)
  const { data: balance } = useGetBalance(data?.plain.address ?? '')

  return (
    <div className="py-3 text-center">
      <h2 className="text-xl text-gray-500 ">Balance</h2>
      <h1 className="text-4xl">{balance?.balanceInSui} SUI</h1>
      <h3 className="text-xl text-purple-600">$ {balance?.balanceInUSD}</h3>
    </div>
  )
}

const DashboardPage: PageComponent = (props) => {
  const [data] = useStorage<WalletEssentials | null>(STORAGE_KEYS.WALLET_ESSENTIALS, null)
  return (
    <div className="px-3 max-w-[600px]">
      <Balance />
      <div className="flex gap-1">
        <Button
          variant="primary"
          size="lg"
          leftIcon={<IoMdArrowDown />}
          className="flex-1"
          onClick={() => {
            props.setPage('temp-deposit-address')
          }}
        >
          Deposit
        </Button>
        <Button
          variant="secondary"
          size="lg"
          leftIcon={<IoMdArrowUp />}
          className="flex-1"
          onClick={() => {
            props.setPage('send-sui')
          }}
        >
          Send
        </Button>
      </div>
      <div>
        <div className="flex justify-between items-center mt-5 text-2xl">
          <p>Activity</p>
          <TbMenuDeep className="rotate-180" />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
