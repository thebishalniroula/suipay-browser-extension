import React from 'react'
import Header from '../../components/header'
import { Button } from '../../components/button'
import { cn } from '../../../utils/cn'
import Background from '../../components/bg'

const SubscrptionItem = () => {
  const [expanded, setExpanded] = React.useState(false)
  return (
    <div>
      <div
        className="flex justify-between bg-[#FFFFFF05] p-4 rounded-[30px]"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex gap-2">
          <div className="bg-[#14141A] text-white/50 h-[52px] w-[52px] rounded-xl text-sm flex justify-center items-center">
            LOGO
          </div>
          <div className="h-full flex flex-col justify-between">
            <p className="font-medium pt-1">Netflix</p>
            <p className="text-sm text-[#ADC8DF] pb-1  font-medium">
              <span className="text-[#7E7AF2]">Renewal: </span> 10 Oct, 2025
            </p>
          </div>
        </div>
        <div className="h-full flex flex-col justify-between">
          <p className="font-bold">3 Sui</p>
          <p className="text-[12px] text-[#ADC8DF]">$10.00</p>
        </div>
      </div>
      <Button
        variant="outline"
        className={cn(
          'border-red-500 h-0 overflow-hidden hidden',
          'animate-height ease-in duration-300',
          {
            'h-10 opacity-100 block': expanded,
          },
        )}
      >
        Cancel Renewal
      </Button>
    </div>
  )
}

const SubscriptionsPage = () => {
  return (
    <div className="px-3">
      <Header title="Subscriptions" />
      <SubscrptionItem />
      <SubscrptionItem />
      <SubscrptionItem />
      <SubscrptionItem />
    </div>
  )
}

export default SubscriptionsPage
