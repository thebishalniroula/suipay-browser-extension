import { Transaction } from '@mysten/sui/transactions'
import { useMutation } from '@tanstack/react-query'
import { Clock, IndividualActiveSubscriptionRegistry, PackageId } from '../const/packages'
import { useStorage } from './use-storage'
import { STORAGE_KEYS } from '../config/storage-keys'
import { WalletEssentials } from '../popup/App'
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'
import { useDecryptSecretsStore } from '../store/secrets'
import { useSuiClient } from '@mysten/dapp-kit'
import { axiosInstance } from '../client/axios'

const createMakePaymentTxn = (params: {
  productId: string
  productOwnerScwAddress: string
  userScwAddress: string
  refId: string
  productSubscribersRegistry: string
}): Transaction => {
  console.log(params)

  const txn = new Transaction()

  txn.moveCall({
    target: `${PackageId}::payment::makePayment`,
    arguments: [
      txn.object(params.productId),
      txn.object(params.userScwAddress),
      txn.object(params.productOwnerScwAddress),
      txn.object(params.productSubscribersRegistry),
      txn.object(IndividualActiveSubscriptionRegistry),
      txn.object(params.refId),
      txn.object(Clock),
    ],
  })
  return txn
}
const makePayment = async (signature: string, bytes: string, accessToken: string) => {
  const res = await axiosInstance.post(
    `/pay`,
    {
      signature,
      bytes,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  return res.data
}

const useMakePayment = () => {
  const [walletData] = useStorage<WalletEssentials | null>(STORAGE_KEYS.WALLET_ESSENTIALS, null)
  const { privateKey } = useDecryptSecretsStore((state) => state)

  const suiClient = useSuiClient()
  return useMutation({
    mutationFn: async (params: {
      productId: string
      productOwnerScwAddress: string
      refId: string
      productSubscribersRegistry: string
    }) => {
      const txn = createMakePaymentTxn({
        productId: params.productId,
        productOwnerScwAddress: params.productOwnerScwAddress,
        userScwAddress: walletData?.plain.scwAddress ?? '',
        refId: params.refId,
        productSubscribersRegistry: params.productSubscribersRegistry,
      })

      const keypair = Ed25519Keypair.fromSecretKey(privateKey)
      txn.setSender(keypair.toSuiAddress())

      const txBytes = await txn.build({
        client: suiClient,
      })
      const { bytes, signature } = await keypair.signTransaction(txBytes)

      return makePayment(signature, bytes, walletData?.plain.accessToken ?? '')
    },
  })
}

export default useMakePayment
