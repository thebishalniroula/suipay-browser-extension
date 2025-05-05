import React from 'react'
import Header from '../../components/header'
import { PageComponent } from '../../type'

const MOCK_ADDRESS = '0x0000000000000000000000000000000000000000'

const TempDepositAddressPage: PageComponent = (props) => {
  return (
    <div className="px-3 flex flex-col gap-4">
      <Header
        title="Deposit"
        withBackButton
        onBackButtonClick={() => {
          props.setPage('home')
        }}
      />
      <div className="p-2 text-center">
        <p className="text-red-500">This address is valid for 4:59</p>
        <p>
          This is a smart contract address, its not permanent. Address refresh in every 5 minutes
        </p>
      </div>
      <div
        className="bg-gray-100 mx-auto flex items-center justify-center text-black"
        style={{
          height: '170px',
          width: '170px',
        }}
      >
        QR CODE
      </div>
      <p className="text-white tex-lg text-center">{MOCK_ADDRESS}</p>
      <div className="bg-purple-300 text-black rounded-md py-4 text-md text-center">
        Copy Address
      </div>
    </div>
  )
}

export default TempDepositAddressPage
