// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'
import { cn } from '../../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-[16px] text-lg font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none gap-2 cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-[#7E7AF2] text-white hover:bg-[#7a76da] font-normal',
        secondary: 'bg-[#CFC4E7] text-black hover:bg-[#b0a5c7] font-normal',
        outline: 'border border-white text-white hover:bg-[#7E7AF2] font-normal',
      },
      size: {
        sm: 'h-[45px] px-4',
        md: 'h-[55px] px-6',
        lg: 'h-[71px] px-[35px] rounded-[26.591px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    )
  },
)

Button.displayName = 'Button'
