import { MIST_PER_SUI } from '@mysten/sui/utils'

export const mistToSui = (amount: number) => {
  return amount / Number(MIST_PER_SUI)
}
