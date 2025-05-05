import React from 'react'
import { IoMdHome } from 'react-icons/io'
import { IoIosStar } from 'react-icons/io'
import { IoIosSettings } from 'react-icons/io'
import { PageName } from '../App'
import { cn } from '../../utils/cn'

type FloatingNavProps = {
  active: string
  setActive: (active: PageName) => void
}
const FloatingNav = (props: FloatingNavProps) => {
  return (
    <div className="border border-gray-200 flex fixed bottom-3 left-1/2 transform -translate-x-1/2 rounded-full p-1 gap-2">
      <IoMdHome
        onClick={() => props.setActive('home')}
        className={cn('h-7 w-7', props.active === 'home' && 'bg-white text-black rounded-full')}
      />
      <IoIosStar
        onClick={() => props.setActive('subscriptions')}
        className={cn('h-7 w-7', props.active === 'home' && 'bg-white text-black rounded-full')}
      />
      <IoIosSettings
        onClick={() => props.setActive('settings')}
        className={cn('h-7 w-7', props.active === 'home' && 'bg-white text-black rounded-full')}
      />
    </div>
  )
}

export default FloatingNav
