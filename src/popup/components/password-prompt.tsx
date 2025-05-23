import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from './button'
import Input from './input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

export type PasswordPromptProps = {
  onClose?: () => void
  onSubmit: (password: string) => void
}

const zPassword = z.object({
  password: z.string().min(1),
})

type PasswordForm = z.infer<typeof zPassword>
const PasswordPrompt = (props: PasswordPromptProps) => {
  const { register, handleSubmit, formState } = useForm<PasswordForm>({
    resolver: zodResolver(zPassword),
  })

  const onSubmit: SubmitHandler<PasswordForm> = ({ password }) => {
    try {
      props.onSubmit(password)
    } catch (error) {
      console.log(error)
      toast.error('Invalid password')
    }
  }

  return (
    <div className="fixed z-[1000] inset-0 bg-black/30 flex justify-center items-center p-3 text-center max-w-[360px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-fit p-5 flex flex-col gap-6 bg-[#333166] rounded-3xl items-center"
      >
        <div>
          <h5 className="mb-1">Enter your password</h5>
          <p className="font-light text-[#ADC8DF] leading-[1.2] text-sm">
            You need to enter your password to perform sensitive actions.
          </p>
        </div>
        <Input type="password" placeholder="Password" {...register('password')} />
        <p className="text-red-500">{formState.errors.password?.message}</p>
        <div className="flex gap-2 w-full">
          {props.onClose && (
            <Button
              variant="secondary"
              size="md"
              onClick={props.onClose}
              className="flex-1"
              type="button"
            >
              Not Now
            </Button>
          )}
          <Button variant="primary" size="md" className="flex-1" type="submit">
            Confirm
          </Button>
        </div>
      </form>
    </div>
  )
}
export default PasswordPrompt
