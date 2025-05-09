import React from 'react'
import { axiosInstance } from '../client/axios'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../config/query-keys'
import { useStorage } from './use-storage'
import { STORAGE_KEYS } from '../config/storage-keys'
import { WalletEssentials } from '../popup/App'

export type Transaction = {
  amount: string
  amountSui: string
  coin: string
  party: string
  timestamp: string
  memo: string
  incoming: boolean
}

type Response = {
  transactions: Array<Transaction>
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

const getTransactionHistory = async (address: string, token: string) => {
  return axiosInstance.get<Response>(`/wallet/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      userType: 'USER',
      id: address,
    },
  })
}

const useGetTransactionHistory = (address: string) => {
  const [walletData] = useStorage<WalletEssentials | null>(STORAGE_KEYS.WALLET_ESSENTIALS, null)

  return useQuery({
    queryKey: [QUERY_KEYS.GET_TRANSACTION_HISTORY],
    queryFn: async () => {
      const res = await getTransactionHistory(address, walletData?.plain.accessToken ?? '')
      return res.data
    },
    enabled: !!address || !!walletData?.plain.accessToken,
  })
}

export default useGetTransactionHistory
