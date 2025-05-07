import { Button } from '../../components/button'
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io'
import { TbMenuDeep } from 'react-icons/tb'
import { PageComponent } from '../../type'
import { useStorage } from '../../../hooks/use-storage'
import { WalletEssentials } from '../../App'
import { STORAGE_KEYS } from '../../../config/storage-keys'
import useGetBalance from '../../../hooks/use-get-balance'
import SortIcon from '../../../icons/sort'

const Balance = () => {
  const [data] = useStorage<WalletEssentials | null>(STORAGE_KEYS.WALLET_ESSENTIALS, null)
  const { data: balance } = useGetBalance(data?.plain.address ?? '')

  return (
    <div className="pt-10 pb-5 text-center flex flex-col gap-3">
      <h2 className="text-xl text-[#8D9BA8] leading-[1]">Balance</h2>
      <h1 className="text-[44px] font-bold tracking-wider leading-[1]">
        {balance?.balanceInSui} SUI
      </h1>
      <h3 className="text-xl text-[#7E7AF2] leading-[1]">$ {balance?.balanceInUSD}</h3>
    </div>
  )
}

const DashboardPage: PageComponent = (props) => {
  const [data] = useStorage<WalletEssentials | null>(STORAGE_KEYS.WALLET_ESSENTIALS, null)
  return (
    <div className="px-3 max-w-[600px]">
      <Balance />
      <div className="flex gap-2 pb-5 pt-4">
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
        <div className="flex justify-between items-center text-[22px] py-3">
          <p>Activity</p>
          <SortIcon />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
