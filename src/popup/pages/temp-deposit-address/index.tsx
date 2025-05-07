import React from 'react'
import Header from '../../components/header'
import { PageComponent } from '../../type'
import InfoBox from '../../components/info-box'

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
      <InfoBox
        title="Valid for 4:59"
        description="This is a temporary address that sends funds to your smart contract wallet."
      />
      <div
        className="bg-gray-100 mx-auto flex items-center justify-center text-black"
        style={{
          height: '170px',
          width: '170px',
        }}
      >
        QR CODE
      </div>
      <p className="text-white tex-base text-center break-words font-medium">{MOCK_ADDRESS}</p>
      <div className="bg-[#7772F833] text-white rounded-2xl p-4 text-base font-medium text-center w-fit mx-auto">
        Copy Address
      </div>
    </div>
  )
}

export default TempDepositAddressPage
