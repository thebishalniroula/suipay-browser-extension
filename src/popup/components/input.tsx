import React from 'react'
import { cn } from '../../utils/cn'

type InputProps = React.ComponentProps<'input'>

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(
        'bg-transparent px-5 rounded-2xl w-full',
        'h-[60px] border border-[#A8A2F64D]',
        'focus:outline-none focus:border-white/70',
        props.className,
      )}
    />
  )
})

Input.displayName = 'Input'

export default Input
