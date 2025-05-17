import axios from 'axios'
import React from 'react'
import { axiosInstance } from '../client/axios'
import { useStorage } from './use-storage'
import { STORAGE_KEYS } from '../config/storage-keys'
import { WalletEssentials } from '../popup/App'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../config/query-keys'

type Response = {
  success: boolean
  product: {
    id: string
    name: string
    price: string
    productType: string
    recurringPeriod: number
    subscribersRegistry: string
    merchantId: string
    merchant: {
      id: string
      businessName: string
      email: string
      wallet: string
      createdAt: string
    }
  }
}

const getProcustDetails = async (id: string, token: string) => {
  const res = await axiosInstance.get<Response>(`/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(res.data)
  return res.data
}

const useGetProductDetails = (id: string) => {
  const [walletData] = useStorage<WalletEssentials | null>(STORAGE_KEYS.WALLET_ESSENTIALS, null)

  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_DETAILS, id],
    queryFn: async () => {
      return await getProcustDetails(id, walletData?.plain.accessToken ?? '')
    },
  })
}

export default useGetProductDetails
