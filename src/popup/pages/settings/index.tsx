import React, { useState } from 'react'
import Header from '../../components/header'
import { TbChevronRight } from 'react-icons/tb'
import LogoutIcon from '../../../icons/logout'
import { useStorage } from '../../../hooks/use-storage'
import { WalletEssentials } from '../../App'
import { STORAGE_KEYS } from '../../../config/storage-keys'
import toast from 'react-hot-toast'
import ConfirmAction, { ConfirmActionProps } from '../../components/confirm-action'
import PasswordPrompt, { PasswordPromptProps } from '../../components/password-prompt'
import { decryptData } from '../../../utils/encryption'
import RecoveryPhrase from '../../components/recovery-phrase'
import { PageComponent } from '../../type'

type SettingsItemProps = {
  title: string
  rightElement?: React.ReactNode
  onClick?: () => void
}
const SettingsItem = (props: SettingsItemProps) => {
  return (
    <div
      className="bg-[#FFFFFF0A] px-4 h-[60px] flex justify-between items-center rounded-2xl cursor-pointer"
      onClick={props.onClick}
    >
      <p>{props.title}</p>
      {props.rightElement}
    </div>
  )
}

const SettingsPage: PageComponent = (props) => {
  const [walletData, setWalletData] = useStorage<WalletEssentials | null>(
    STORAGE_KEYS.WALLET_ESSENTIALS,
    null,
  )

  const [confirmActionProps, setConfirmActionProps] = useState<Omit<
    ConfirmActionProps,
    'onClose'
  > | null>(null)

  const [enterPwPromptProps, setEnterPwPromptProps] = useState<Omit<
    PasswordPromptProps,
    'onClose'
  > | null>(null)

  const [recoveryPhrase, setRecoveryPhrase] = useState<string>('')

  const handleLogout = () => {
    setConfirmActionProps({
      title: 'Logout',
      description: 'Are you sure you want to logout?',
      onSubmit: () => {
        setWalletData(null)
        toast.success('Logged out successfully')
        props.setPage('home')
      },
    })
  }

  const handleShowRecovertyPhrase = () => {
    setEnterPwPromptProps({
      onSubmit: async (password) => {
        try {
          const decryptedMnemonic = await decryptData(walletData!.encrypted.mnemonic, password)
          setRecoveryPhrase(decryptedMnemonic)
          setEnterPwPromptProps(null)
        } catch (error) {
          console.log(error)
          toast.error('Invalid password')
        }
      },
    })
  }

  return (
    <div className="max-w-[360px] px-3 flex flex-col">
      {confirmActionProps && (
        <ConfirmAction {...confirmActionProps} onClose={() => setConfirmActionProps(null)} />
      )}

      {enterPwPromptProps && (
        <PasswordPrompt {...enterPwPromptProps} onClose={() => setEnterPwPromptProps(null)} />
      )}

      <Header
        title={recoveryPhrase?.length > 0 ? 'Recovery Phrase' : 'Settings'}
        withBackButton={!!recoveryPhrase}
        onBackButtonClick={() => {
          setRecoveryPhrase('')
        }}
      />

      {recoveryPhrase && (
        <RecoveryPhrase
          className="relative z-[200] h-full flex-1/2 mt-auto"
          phrase={recoveryPhrase}
        />
      )}
      {!recoveryPhrase && (
        <div className="flex flex-col gap-2">
          <SettingsItem title="Change Password" rightElement={<TbChevronRight color="#ADC8DF" />} />
          <SettingsItem
            title="Auto-lock Timer"
            rightElement={
              <div className="flex gap-2 text-[#ADC8DF] items-center">
                <span className="font-light">10 Minutes</span>
                <TbChevronRight color="#ADC8DF" />
              </div>
            }
          />
          <SettingsItem
            title="Show Recovery Phrase"
            rightElement={<TbChevronRight color="#ADC8DF" />}
            onClick={handleShowRecovertyPhrase}
          />
          <SettingsItem onClick={handleLogout} title="Logout" rightElement={<LogoutIcon />} />
        </div>
      )}
    </div>
  )
}

export default SettingsPage
