import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../config/query-keys'
import { suiClient } from '../client/sui'
import { MIST_PER_SUI } from '@mysten/sui/utils'

const getSuiPriceUSD = async () => {
  const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=sui&vs_currencies=usd')
  const data = await res.json()
  return data.sui.usd
}

const useGetBalance = (address: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_BALANCE, address],
    queryFn: async () => {
      const balance = await suiClient.getBalance({
        owner: address,
      })

      const balanceInSui = Number(BigInt(+balance.totalBalance) / MIST_PER_SUI)
      const suiPriceUSD = await getSuiPriceUSD()
      const balanceInUSD = balanceInSui * suiPriceUSD

      return {
        ...balance,
        balanceInSui,
        balanceInUSD,
      }
    },
  })
}

export default useGetBalance
