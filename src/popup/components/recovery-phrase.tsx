import React from 'react'
import InfoBox from './info-box'
import { Button } from './button'
import toast from 'react-hot-toast'

type RecoveryPhraseProps = {
  phrase: string
  handleContinue?: () => void
  className?: string
}
const RecoveryPhrase = (props: RecoveryPhraseProps) => {
  const handleCopy = async () => {
    try {
      if (window.navigator.clipboard) {
        await window.navigator.clipboard.writeText(props.phrase)
        toast.success('Copied to clipboard')
      }
    } catch (error) {
      toast.error('Failed to copy')
    }
  }

  return (
    <div className={props.className}>
      <div className="flex flex-col h-full py-5 gap-5">
        <InfoBox
          title="Do not share your Recovery phrase!"
          description="If someone has your Recovery Phrase they will have full control of your wallet."
        />
        <div className="grid grid-cols-3 gap-2">
          {props.phrase.split(' ').map((word, index) => (
            <div
              key={index}
              className="border border-white/25 rounded-[10px] px-3 text-center text-white h-[42px] flex items-center text-[14px]"
            >
              {index + 1}. {word}
            </div>
          ))}
        </div>
        <div
          onClick={handleCopy}
          className="bg-[#7772F833] text-white rounded-2xl p-4 text-base font-medium text-center cursor-pointer w-40 mx-auto"
        >
          Copy Address
        </div>
        {props.handleContinue && (
          <Button variant="primary" onClick={props.handleContinue} className="mt-auto">
            Continue
          </Button>
        )}
      </div>
    </div>
  )
}

export default RecoveryPhrase
