import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../config/query-keys'
import { axiosInstance } from '../client/axios'
import { useStorage } from './use-storage'
import { STORAGE_KEYS } from '../config/storage-keys'
import { WalletEssentials } from '../popup/App'

export type SUBSCRIPTION_STATUS = 'ACTIVE' | 'FAILED'

export type Subscription = {
  id: string
  userId: string
  productId: string
  lastPaidOn: string
  nextPaymentDue: string
  ref_id: string
  status: SUBSCRIPTION_STATUS
  createdAt: string
  updatedAt: string
  product: {
    id: string
    name: string
    price: string
    productType: 'SUBSCRIPTION' | 'ONETIME'
    recurringPeriod: number
    subscribersRegistry: string
    merchantId: string
  }
}
type Response = {
  success: boolean
  subscriptions: Subscription[]
}
const getSubscriptions = async (accessToken: string) => {
  const res = await axiosInstance.get<Response>('/my-subscriptions', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return res.data
}

const useGetSubscriptions = () => {
  const [data] = useStorage<WalletEssentials | null>(STORAGE_KEYS.WALLET_ESSENTIALS, null)
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SUBSCRIPTIONS],
    queryFn: () => getSubscriptions(data?.plain.accessToken ?? ''),
    enabled: !!data?.plain.accessToken,
  })
}

export default useGetSubscriptions
