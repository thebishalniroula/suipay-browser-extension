import React from 'react'
import { cn } from '../../utils/cn'

type InputProps = React.ComponentProps<'input'>
const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className={cn('bg-transparent border px-4 rounded-xl w-full', props.className)}
      style={{
        height: '60px',
        borderColor: '#A8A2F64D',
      }}
    />
  )
}

export default Input
