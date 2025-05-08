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
import useSignUp from '../../../hooks/use-sign-up'

const pwSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type PasswordForm = z.infer<typeof pwSchema>

type CreateWalletFormProps = {
  setSeedPhrase: (seedPhrase: string) => void
}
const CreateWalletForm = (props: CreateWalletFormProps) => {
  const signUpMutation = useSignUp()

  const pwForm = useForm<PasswordForm>({
    resolver: zodResolver(pwSchema),
  })

  const [_, setWalletEssentials] = useStorage<WalletEssentials | null>(
    STORAGE_KEYS.WALLET_ESSENTIALS,
    null,
  )

  const handleSubmit: SubmitHandler<PasswordForm> = async (data) => {
    const mnemonic = generateMnemonic()
    const keyPair = await deriveKeyPair(mnemonic)
    const address = keyPair.getPublicKey().toSuiAddress()
    const privateKey = keyPair.getSecretKey()

    const encryptedPrivateKey = await encryptData(privateKey, data.password)
    const encryptedMnemonic = await encryptData(mnemonic, data.password)

    const res = await signUpMutation.mutateAsync({
      email: data.email,
      password: data.password,
      id: address,
    })

    setWalletEssentials({
      plain: {
        address,
        publicKey: keyPair.getPublicKey().toBase64(),
        accessToken: res.data.accessToken,
      },
      encrypted: {
        privateKey: encryptedPrivateKey,
        mnemonic: encryptedMnemonic,
      },
    })
    props.setSeedPhrase(mnemonic)
  }

  return (
    <form className="flex-1" onSubmit={pwForm.handleSubmit(handleSubmit)}>
      <div className="flex flex-col h-full py-5">
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <div>
            <h2 className="text-2xl text-center mb-1 font-semibold">Create a password</h2>
            <p className="text-center text-base">You will use this to unlock your wallet.</p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Input type="email" placeholder="Email" {...pwForm.register('email')} />
            <Input
              type="password"
              placeholder="Password"
              {...pwForm.register('password')}
              autoComplete="off"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              {...pwForm.register('confirmPassword')}
              autoComplete="off"
            />
          </div>
          {pwForm.formState.errors?.confirmPassword && (
            <p className="text-red-500">{pwForm.formState.errors.confirmPassword.message}</p>
          )}
        </div>

        <Button disabled={signUpMutation.isPending} variant="primary">
          {signUpMutation.isPending ? 'Creating...' : 'Continue'}
        </Button>
      </div>
    </form>
  )
}

export default CreateWalletForm
