import React from 'react'
import { Button } from '../../components/button'

const DETAILS = {
  'Product Name': 'Spotify',
  'Product Type': 'Subscription',
  Duration: '1 Week',
  Amount: '20 SUI',
  Gas: '0.1 SUI',
}

const ConfirmationPage = () => {
  return (
    <div className="max-w-[360px] flex flex-col justify-between h-[100vh] p-5">
      <div className="flex flex-col gap-2">
        {/* Logos */}
        <div className="relative h-[70px] w-[70px]">
          <img src="img/sui-logo.png" className="absolute inset-0 object-center" />
          <img
            src="img/sui-logo.png"
            className="absolute inset-0 transform translate-x-1/2 object-center"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-medium text-3xl">Spotify</p>
          <p className="text-[#7E7AF2] text-lg">Wants to make a transaction</p>
        </div>
      </div>
      <div className="rounded-xl border border-[#7E7AF2]">
        {Object.entries(DETAILS).map(([key, value]) => (
          <div className="flex justify-between p-4 border-b border-[#1C1140] last-of-type:border-transparent font-medium">
            <p>{key}</p>
            <p>{value}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1">
          Cancel
        </Button>
        <Button variant="primary" className="flex-1">
          Not Now
        </Button>
      </div>
    </div>
  )
}

export default ConfirmationPage
