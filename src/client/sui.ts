import { getFullnodeUrl, SuiClient } from '@mysten/sui/client'

export const suiClient = new SuiClient({ network: 'testnet', url: getFullnodeUrl('testnet') })
