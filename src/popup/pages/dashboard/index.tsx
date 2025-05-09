import { Button } from '../../components/button'
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io'
import { PageComponent } from '../../type'
import { useStorage } from '../../../hooks/use-storage'
import { WalletEssentials } from '../../App'
import { STORAGE_KEYS } from '../../../config/storage-keys'
import useGetBalance from '../../../hooks/use-get-balance'
import SortIcon from '../../../icons/sort'
import ArrowSlanted from '../../../icons/arrow-slanted'
import useGetTransactionHistory, { Transaction } from '../../../hooks/use-get-transaction-history'
import { MIST_PER_SUI } from '@mysten/sui/utils'
import useSuiToUSD from '../../../hooks/use-sui-to-usd'

const Balance = () => {
  const [data] = useStorage<WalletEssentials | null>(STORAGE_KEYS.WALLET_ESSENTIALS, null)
  const { data: balance } = useGetBalance(data?.plain.address ?? '')
  console.log(balance, data?.plain)
  return (
    <div className="pt-10 pb-5 text-center flex flex-col gap-3">
      <h2 className="text-xl text-[#8D9BA8] leading-[1]">Balance</h2>
      <h1 className="text-[44px] font-bold tracking-wider leading-[1]">{balance?.balance} SUI</h1>
      <h3 className="text-xl text-[#7E7AF2] leading-[1]">$ {balance?.balanceInUSD}</h3>
    </div>
  )
}

const DashboardPage: PageComponent = (props) => {
  const [data] = useStorage<WalletEssentials | null>(STORAGE_KEYS.WALLET_ESSENTIALS, null)
  const history = useGetTransactionHistory(data?.plain.address ?? '')
  return (
    <div className="px-3 max-w-[600px]">
      <Balance />
      <div className="flex gap-2 pb-5 pt-4">
        <Button
          variant="primary"
          size="md"
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
          size="md"
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
        <div className="w-full flex flex-col gap-2 pb-23">
          {!history.data?.transactions.length && (
            <p className="text-center opacity-50">No transactions</p>
          )}
          {history.data?.transactions.map((item, key) => {
            return <TransactionItem transaction={item} key={key} />
          })}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

const TransactionItem = (props: { transaction: Transaction }) => {
  const { data } = useSuiToUSD(+props.transaction.amount / Number(MIST_PER_SUI))

  return (
    <div className="rounded-[30px] p-4 flex justify-between bg-[#FFFFFF05]">
      <div className="flex gap-3">
        <div className="h-[52px] w-[52px] rounded-2xl bg-[#7772F833] flex justify-center items-center">
          <ArrowSlanted className={!props.transaction.incoming ? 'rotate-180' : ''} />
        </div>
        <div className="flex flex-col justify-between py-1">
          <p className="font-medium ">{props.transaction.incoming ? 'Deposit' : 'Withdraw'}</p>
          <p className="text-sm text-[#ADC8DF] font-medium ">0x65rg2...32fd</p>
        </div>
      </div>
      <div className="flex flex-col justify-between py-1 text-right">
        <p className="text-[#3EF7B4] font-semibold">
          {Number(+props.transaction.amount / Number(MIST_PER_SUI)).toFixed(2)} SUI
        </p>
        <p className="text-sm text-[#ADC8DF]">$ {data}</p>
      </div>
    </div>
  )
}
