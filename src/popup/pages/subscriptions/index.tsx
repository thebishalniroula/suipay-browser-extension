import React from 'react'
import Header from '../../components/header'
import { Button } from '../../components/button'
import { cn } from '../../../utils/cn'

const SubscrptionItem = () => {
  const [expanded, setExpanded] = React.useState(false)
  return (
    <div>
      <div className="flex justify-between" onMouseOver={() => setExpanded(true)}>
        <div className="flex gap-2">
          <div
            style={{
              height: '52px',
              width: '52px',
            }}
            className="bg-gray-400 text-black"
          >
            LOGO
          </div>
          <div>
            <p>NETFLIX</p>
            <p>Renewal: 10 Oct, 2025</p>
          </div>
        </div>
        <div>
          <p>3 Sui</p>
          <p>$10.00</p>
        </div>
      </div>
      <Button
        variant="outline"
        className={cn('border-red-500 h-0 overflow-hidden', 'animate-height ease-in duration-300', {
          'h-10': expanded,
        })}
      >
        Cancel Renewal
      </Button>
    </div>
  )
}

const SubscriptionsPage = () => {
  return (
    <div>
      <Header title="Subscriptions" className="mb-4" />
      <SubscrptionItem />
      <SubscrptionItem />
      <SubscrptionItem />
      <SubscrptionItem />
      <SubscrptionItem />
      <SubscrptionItem />
    </div>
  )
}

export default SubscriptionsPage
