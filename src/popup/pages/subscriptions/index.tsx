import React, { useState } from 'react'
import Header from '../../components/header'
import { Button } from '../../components/button'
import { cn } from '../../../utils/cn'
import ConfirmAction, { ConfirmActionProps } from '../../components/confirm-action'

type SubscrptionItemProps = {
  logo: string
  title: string
  description: string
  onCancel: (props: Omit<ConfirmActionProps, 'onClose'>) => void
}
const SubscrptionItem = (props: SubscrptionItemProps) => {
  const [expanded, setExpanded] = React.useState(false)
  const handleCancel = () => {}
  return (
    <div
      className={cn(
        'flex flex-col gap-3 justify-between p-4 rounded-[30px] cursor-pointer bg-[#FFFFFF05]',
        'border-[0.5px] border-transparent',
        'animate-height ease-in duration-300',
        'h-[84px]',
        {
          'bg-[#33316640] border-[#27264F] h-[141px]': expanded,
        },
      )}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between w-full">
        <div className="flex gap-2">
          <div className="bg-[#14141A] text-white/50 h-[52px] w-[52px] rounded-xl text-sm flex justify-center items-center">
            LOGO
          </div>
          <div className="h-full flex flex-col justify-between">
            <p className="font-medium pt-1">Netflix</p>
            <p className="text-sm text-[#ADC8DF] pb-1 font-normal">
              <span className="text-[#7E7AF2]">Renewal: </span> 10 Oct, 2025
            </p>
          </div>
        </div>
        <div className="h-full flex flex-col justify-between">
          <p className="font-medium text-base">3 SUI</p>
          <p className="text-sm text-[#ADC8DF]">$10.00</p>
        </div>
      </div>{' '}
      <Button
        variant="outline"
        className={cn(
          'border-[#FF4D6B] h-0 overflow-hidden hidden font-normal rounded-[50px] hover:bg-black/10',
          'animate-height ease-in duration-300',
          {
            'h-11 opacity-100 block': expanded,
          },
        )}
        onClick={(e) => {
          e.stopPropagation()
          props.onCancel({
            logo: props.logo,
            title: 'Confirm Cancellation',
            description:
              'If you confirm and end your subscription now, you can still access it until 20 Apr 2022.',
            onSubmit: handleCancel,
          })
        }}
      >
        Cancel Renewal
      </Button>
    </div>
  )
}

const SubscriptionsPage = () => {
  const [cancellationProps, setCancellationProps] = useState<Omit<
    ConfirmActionProps,
    'onClose'
  > | null>(null)
  return (
    <div className="px-3">
      <Header title="Subscriptions" />
      <div className="flex flex-col gap-2.5">
        {cancellationProps && (
          <ConfirmAction {...cancellationProps} onClose={() => setCancellationProps(null)} />
        )}
        <SubscrptionItem
          title="Netflix"
          description="Renewal: 10 Oct, 2025"
          logo=""
          onCancel={setCancellationProps}
        />

        <SubscrptionItem
          title="Netflix"
          description="Renewal: 10 Oct, 2025"
          logo=""
          onCancel={setCancellationProps}
        />

        <SubscrptionItem
          title="Netflix"
          description="Renewal: 10 Oct, 2025"
          logo=""
          onCancel={setCancellationProps}
        />
      </div>
    </div>
  )
}

export default SubscriptionsPage
