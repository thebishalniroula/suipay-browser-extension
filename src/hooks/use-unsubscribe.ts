import { useMutation } from '@tanstack/react-query'
import { WalletEssentials } from '../popup/App'
import { useStorage } from './use-storage'
import { STORAGE_KEYS } from '../config/storage-keys'
import { axiosInstance } from '../client/axios'
import { Transaction } from '@mysten/sui/transactions'
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'
import { useDecryptSecretsStore } from '../store/secrets'
import { useSuiClient } from '@mysten/dapp-kit'
import { IndividualActiveSubscriptionRegistry, PackageId } from '../const/packages'

type UnsubscribeProductParams = {
  signature: string
  bytes: string
  accessToken: string
}
const unsubscribeProduct = async ({ accessToken, ...params }: UnsubscribeProductParams) => {
  const res = await axiosInstance.post('/unsubscribe', params, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return res.data
}

type CreateCancelSubscriptionTxn = {
  productId: string
  paymentIntent: string
  productRegistry: string
}

const useUnsubscribe = () => {
  const [walletData] = useStorage<WalletEssentials | null>(STORAGE_KEYS.WALLET_ESSENTIALS, null)
  const privateKey = useDecryptSecretsStore((state) => state.privateKey)
  const suiClient = useSuiClient()
  return useMutation({
    mutationFn: async (params: CreateCancelSubscriptionTxn) => {
      const txn = createCancelSubscriptionTxn(params)

      const keypair = Ed25519Keypair.fromSecretKey(privateKey)
      txn.setSender(keypair.toSuiAddress())

      const txBytes = await txn.build({
        client: suiClient,
      })
      const { bytes, signature } = await keypair.signTransaction(txBytes)

      return unsubscribeProduct({
        signature,
        bytes,
        accessToken: walletData?.plain.accessToken ?? '',
      })
    },
  })
}

export default useUnsubscribe

const createCancelSubscriptionTxn = (params: CreateCancelSubscriptionTxn) => {
  const txn = new Transaction()
  txn.moveCall({
    target: `${PackageId}::payment::unsubscribeFromProduct`,
    arguments: [
      txn.object(params.productId),
      txn.object(params.paymentIntent),
      txn.object(params.productRegistry),
      txn.object(IndividualActiveSubscriptionRegistry),
    ],
  })
  return txn
}
