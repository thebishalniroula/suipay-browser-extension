import React from 'react'
import { cn } from '../../utils/cn'

type HeaderProps = {
  title: string
  withBackButton?: boolean
  onBackButtonClick?: () => void
  className?: string
}
const Header = (props: HeaderProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between text-white py-8 relative w-full',
        props.className,
      )}
    >
      {props.withBackButton && (
        <button
          className="absolute top-1/2 transform -translate-y-1/2 text-white"
          onClick={props.onBackButtonClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}
      <h1 className="text-xl font-bold text-center w-full">{props.title}</h1>
    </div>
  )
}

export default Header
