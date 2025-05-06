import React from 'react'
import { cn } from '../../utils/cn'

type InputProps = React.ComponentProps<'input'>

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={cn('bg-transparent border px-4 rounded-xl w-full', props.className)}
      style={{
        height: '60px',
        borderColor: '#A8A2F64D',
        ...props.style,
      }}
    />
  )
})

Input.displayName = 'Input'

export default Input
