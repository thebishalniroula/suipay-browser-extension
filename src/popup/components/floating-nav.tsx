import React from 'react'
import { IoMdHome } from 'react-icons/io'
import { IoIosStar } from 'react-icons/io'
import { IoIosSettings } from 'react-icons/io'
import { PageName } from '../App'
import { cn } from '../../utils/cn'
import { HomeIconFilled, HomeIconOutlined } from '../../icons/home'
import { SubscriptionFilled, SubscriptionOutlined } from '../../icons/subscriptions'
import { SettingsFilled, SettingsOutlined } from '../../icons/settings'

type FloatingNavProps = {
  active: string
  setActive: (active: PageName) => void
}
const FloatingNav = (props: FloatingNavProps) => {
  const HomeIcon = props.active === 'home' ? HomeIconFilled : HomeIconOutlined
  const SubscriptionsIcon =
    props.active === 'subscriptions' ? SubscriptionFilled : SubscriptionOutlined
  const SettingsIcon = props.active === 'settings' ? SettingsFilled : SettingsOutlined
  return (
    <div
      className={cn(
        'border-[0.5px] border-[#153048] flex fixed bottom-3 left-1/2 transform -translate-x-1/2 rounded-full px-2 py-[6px] gap-[6px] bg-[#FFFFFF03]',
        '[box-shadow:_0px_0px_5px_0px_#283961_inset]',
      )}
    >
      <div
        className={cn(
          'h-12 w-12',
          'flex justify-center items-center rounded-full',
          props.active === 'home' && 'bg-white',
        )}
      >
        <HomeIcon onClick={() => props.setActive('home')} />
      </div>
      <div
        className={cn(
          'h-12 w-12',
          'flex justify-center items-center rounded-full',
          props.active === 'subscriptions' && 'bg-white',
        )}
      >
        <SubscriptionsIcon onClick={() => props.setActive('subscriptions')} />
      </div>
      <div
        className={cn(
          'h-12 w-12',
          'flex justify-center items-center rounded-full',
          props.active === 'settings' && 'bg-white',
        )}
      >
        <SettingsIcon onClick={() => props.setActive('settings')} />
      </div>
    </div>
  )
}

export default FloatingNav
