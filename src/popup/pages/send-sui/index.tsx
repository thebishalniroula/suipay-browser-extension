import Header from '../../components/header'
import { PageComponent } from '../../type'
import Input from '../../components/input'
import { Button } from '../../components/button'
import useSendSui from '../../../hooks/use-send-sui'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

const zSendSuiSchema = z.object({
  toAddress: z.string(),
  amount: z.string().refine((val) => /^\d+$/.test(val), {
    message: 'Only numbers are allowed',
  }),
})
type SendSuiForm = z.infer<typeof zSendSuiSchema>
const SendSuiPage: PageComponent = (props) => {
  const form = useForm<SendSuiForm>({
    resolver: zodResolver(zSendSuiSchema),
  })
  const { mutateAsync, isPending } = useSendSui()
  const onSubmit: SubmitHandler<SendSuiForm> = async (data) => {
    try {
      await mutateAsync({
        amount: +data.amount,
        toAddress: data.toAddress,
      })
      toast.success(data.amount + ' SUI sent successfully')
    } catch (error) {
      console.log(error)
      toast.error('Error sending SUI')
    }
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="px-3 flex flex-col"
      style={{ height: '600px' }}
    >
      <Header
        title="Send Sui"
        withBackButton
        onBackButtonClick={() => {
          props.setPage('home')
        }}
        className="mb-10"
      />
      <div className="h-24 w-24 rounded-full mb-8 flex justify-center items-center mx-auto relative">
        <img src="img/sui-logo.png" className="absolute inset-0 object-center" />
      </div>
      <p className="text-red-500 text-center mb-3">
        {form.formState.errors.toAddress?.message ?? form.formState.errors.amount?.message}
      </p>
      <div className="flex flex-col gap-2">
        <Input placeholder="Recipient’s Wallet Address" {...form.register('toAddress')} />
        <Input
          inputMode="numeric" // 📱 Mobile keyboards will show numbers
          pattern="[0-9]*"
          placeholder="Amount"
          {...form.register('amount')}
        />
        <p className="text-right font-normal ">Available: 55.544 SUI</p>
      </div>
      <div className="mt-auto flex gap-2 py-4">
        <Button variant="secondary" className="flex-1" type="button">
          Cancel
        </Button>
        <Button variant="primary" className="flex-1" disabled={isPending}>
          {isPending ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </form>
  )
}

export default SendSuiPage
