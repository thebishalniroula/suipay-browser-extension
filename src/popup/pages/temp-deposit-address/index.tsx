import React from 'react'
import Header from '../../components/header'
import { PageComponent } from '../../type'
import InfoBox from '../../components/info-box'
import QRCode from 'react-qr-code'
import toast from 'react-hot-toast'

const MOCK_ADDRESS = '0x0000000000000000000000000000000000000000'

const TempDepositAddressPage: PageComponent = (props) => {
  const handleCopy = async () => {
    try {
      if (window.navigator.clipboard) {
        await window.navigator.clipboard.writeText(MOCK_ADDRESS)
        toast.success('Copied to clipboard')
      }
    } catch (error) {
      toast.error('Failed to copy')
    }
  }
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
        className="bg-white mx-auto flex items-center justify-center text-black rounded-xl"
        style={{
          height: '170px',
          width: '170px',
        }}
      >
        <QRCode size={155} value={MOCK_ADDRESS} viewBox={`0 0 256 256`} />{' '}
      </div>
      <p className="text-white tex-base text-center break-words font-medium">{MOCK_ADDRESS}</p>
      <div
        onClick={handleCopy}
        className="bg-[#7772F833] text-white rounded-2xl p-4 text-base font-medium text-center w-fit mx-auto cursor-pointer"
      >
        Copy Address
      </div>
    </div>
  )
}

export default TempDepositAddressPage
