import Input from '../../components/input'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../components/button'
import { deriveKeyPair, generateMnemonic } from '../../../utils/create-address'
import { encryptData } from '../../../utils/encryption'
import { WalletEssentials } from '../../App'
import { STORAGE_KEYS } from '../../../config/storage-keys'
import { useStorage } from '../../../hooks/use-storage'
import useLogin from '../../../hooks/use-login'
import toast from 'react-hot-toast'
import { PageComponent } from '../../type'

const pwSchema = z.object({
  seedphrase: z.string().refine((val) => val.split(' ').length === 12, {
    message: 'Invalid seed phrase',
  }),
  password: z.string(),
})

type PasswordForm = z.infer<typeof pwSchema>

const ImportWalletForm: PageComponent = (props) => {
  const loginMutation = useLogin()

  const pwForm = useForm<PasswordForm>({
    resolver: zodResolver(pwSchema),
  })

  const [_, setWalletEssentials] = useStorage<WalletEssentials | null>(
    STORAGE_KEYS.WALLET_ESSENTIALS,
    null,
  )

  const handleSubmit: SubmitHandler<PasswordForm> = async (data) => {
    try {
      const mnemonic = data.seedphrase
      const keyPair = await deriveKeyPair(mnemonic)
      const address = keyPair.getPublicKey().toSuiAddress()
      const privateKey = keyPair.getSecretKey()

      const encryptedPrivateKey = await encryptData(privateKey, data.password)
      const encryptedMnemonic = await encryptData(mnemonic, data.password)

      const res = await loginMutation.mutateAsync({
        password: data.password,
        id: address,
      })

      setWalletEssentials({
        plain: {
          address,
          publicKey: keyPair.getPublicKey().toBase64(),
          accessToken: res.accessToken,
          scwAddress: res.user.wallet,
        },
        encrypted: {
          privateKey: encryptedPrivateKey,
          mnemonic: encryptedMnemonic,
        },
      })
      toast.success('Logged in successfully.')
      props.setPage('home')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <form className="flex-1" onSubmit={pwForm.handleSubmit(handleSubmit)}>
      <div className="flex flex-col h-full py-5">
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <div>
            <h2 className="text-2xl text-center mb-1 font-semibold">Import Seed Phrase</h2>
            <p className="text-center text-base">You can import your existing seed phrase.</p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Input type="text" placeholder="Seed Phrase" {...pwForm.register('seedphrase')} />
            <p className="text-sm text-[#FF4D6B] mb-1 ml-6">
              {pwForm.formState.errors.seedphrase?.message}
            </p>
            <Input
              type="password"
              placeholder="Password"
              {...pwForm.register('password')}
              autoComplete="off"
            />
            <p className="text-sm text-[#FF4D6B] ml-6">
              {pwForm.formState.errors.password?.message}
            </p>
          </div>
        </div>

        <Button disabled={loginMutation.isPending} variant="primary">
          {loginMutation.isPending ? 'Creating...' : 'Continue'}
        </Button>
      </div>
    </form>
  )
}

export default ImportWalletForm
