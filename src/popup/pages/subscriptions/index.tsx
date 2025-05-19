import React, { useState } from 'react'
import Header from '../../components/header'
import { Button } from '../../components/button'
import { cn } from '../../../utils/cn'
import ConfirmAction, { ConfirmActionProps } from '../../components/confirm-action'
import useGetSubscriptions, { Subscription } from '../../../hooks/use-get-subscriptions'
import useUnsubscribe from '../../../hooks/use-unsubscribe'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../../config/query-keys'
import useSuiToUSD from '../../../hooks/use-sui-to-usd'
import { mistToSui } from '../../../utils/sui'
import { format } from 'date-fns'

const SubscrptionItem = (props: Subscription) => {
  const [expanded, setExpanded] = React.useState(false)
  const cancelSubscriptionMutation = useUnsubscribe()

  const queryClient = useQueryClient()
  const handleCancel = async () => {
    try {
      await cancelSubscriptionMutation.mutateAsync({
        productId: props.product.id,
        paymentIntent: props.id,
        productRegistry: props.product.subscribersRegistry,
      })
      toast.success('Subscription cancelled successfully')
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_SUBSCRIPTIONS] })
    } catch (error) {
      console.log(error)
      toast.error('Error cancelling subscription')
    }
  }

  const [cancellationProps, setCancellationProps] = useState<Omit<
    ConfirmActionProps,
    'onClose'
  > | null>(null)

  const { data: usd } = useSuiToUSD(mistToSui(+props.product.price))

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
      {cancellationProps && (
        <ConfirmAction
          {...cancellationProps}
          onClose={() => setCancellationProps(null)}
          isLoading={cancelSubscriptionMutation.isPending}
        />
      )}
      <div className="flex justify-between w-full">
        <div className="flex gap-2">
          <div className="bg-[#14141A] text-white/50 h-[52px] w-[52px] rounded-xl text-sm flex justify-center items-center">
            LOGO
          </div>
          <div className="h-full flex flex-col justify-between">
            <p className="font-medium pt-1">{props.product.name}</p>
            <p className="text-sm text-[#ADC8DF] pb-1 font-normal">
              <span className="text-[#7E7AF2]">Renewal: </span>{' '}
              {props.nextPaymentDue
                ? format(new Date(props.nextPaymentDue), 'do MMMM, yyyy')
                : 'N/A'}
            </p>
          </div>
        </div>
        <div className="h-full flex flex-col justify-between">
          <p className="font-medium text-base">{mistToSui(+props.product.price)} SUI</p>
          <p className="text-sm text-[#ADC8DF]">${usd}</p>
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
          setCancellationProps({
            logo: '',
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
  const { data: subscriptions } = useGetSubscriptions()

  return (
    <div className="px-3">
      <Header title="Subscriptions" />
      {!subscriptions?.subscriptions.length && (
        <p className="text-lg text-[#ADC8DF] font-medium text-center">No Subscriptions</p>
      )}

      <div className="flex flex-col gap-2.5">
        {subscriptions?.subscriptions.map((subscription) => <SubscrptionItem {...subscription} />)}
      </div>
    </div>
  )
}

export default SubscriptionsPage
