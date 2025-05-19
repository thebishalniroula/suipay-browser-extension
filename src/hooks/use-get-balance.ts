import { useMutation, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../config/query-keys'
import { axiosInstance } from '../client/axios'
import useGetCurrentSuiPrice from './use-get-current-sui-price'
import { createSendSuiTxn, signAndExecute } from './use-send-sui'
import { useStorage } from './use-storage'
import { WalletEssentials } from '../popup/App'
import { STORAGE_KEYS } from '../config/storage-keys'
import { useDecryptSecretsStore } from '../store/secrets'
import { useSuiClient } from '@mysten/dapp-kit'
import toast from 'react-hot-toast'
import { MIST_PER_SUI } from '@mysten/sui/utils'

type Response = {
  balance: number
  walletBalance: number
  accountBalance: number
}
const getBalance = (address: string) => {
  return axiosInstance.get<Response>(`/wallet/balance`, {
    params: {
      id: address,
      userType: 'USER',
    },
  })
}

const THRESHOLD = 0.1

const useGetBalance = (address: string) => {
  const { data: suiPrice } = useGetCurrentSuiPrice()

  const { mutateAsync } = usePullThresholdBalanceToPw()

  return useQuery({
    queryKey: [QUERY_KEYS.GET_BALANCE, address],
    queryFn: async () => {
      const res = await getBalance(address)
      if (
        res.data.accountBalance < THRESHOLD * Number(MIST_PER_SUI) &&
        res.data.walletBalance > (THRESHOLD + 0.1) * Number(MIST_PER_SUI)
      ) {
        await mutateAsync({ amount: THRESHOLD * Number(MIST_PER_SUI) })
      }
      return {
        ...res.data,
        balance: Number(res.data.balance).toFixed(2),
        balanceInUSD: suiPrice ? Number(suiPrice * res.data.balance).toFixed(2) : '...',
      }
    },
    enabled: !!address && !!suiPrice,
  })
}

export default useGetBalance

const usePullThresholdBalanceToPw = () => {
  const [walletData] = useStorage<WalletEssentials | null>(STORAGE_KEYS.WALLET_ESSENTIALS, null)
  const { privateKey } = useDecryptSecretsStore((state) => state)

  const suiClient = useSuiClient()
  return useMutation({
    mutationFn: async (data: { amount: number }) => {
      const txn = createSendSuiTxn(
        data.amount,
        walletData?.plain.scwAddress ?? '',
        walletData?.plain.address ?? '',
      )
      return signAndExecute(privateKey, txn, suiClient)
    },
    onSuccess: () => {
      toast.success('Threshold balance updated')
    },
  })
}
