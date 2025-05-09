import axios from 'axios'
import React from 'react'
import { axiosInstance } from '../client/axios'
import { useStorage } from './use-storage'
import { STORAGE_KEYS } from '../config/storage-keys'
import { WalletEssentials } from '../popup/App'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../config/query-keys'

const getProcustDetails = async (id: string, token: string) => {
  return await axiosInstance.get(`/product${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const useGetProductDetails = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_DETAILS, id],
    queryFn: async () => {
      const [walletData] = useStorage<WalletEssentials | null>(STORAGE_KEYS.WALLET_ESSENTIALS, null)
      return await getProcustDetails(id, walletData?.plain.accessToken ?? '')
    },
  })
}

export default useGetProductDetails
