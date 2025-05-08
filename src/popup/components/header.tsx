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
          className="absolute top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
          onClick={props.onBackButtonClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M17.5 21L10.5 14L17.5 7"
              stroke="#ADC8DF"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      )}
      <h1 className="text-2xl font-medium text-center w-full tracking-[-0.408px]">{props.title}</h1>
    </div>
  )
}

export default Header
