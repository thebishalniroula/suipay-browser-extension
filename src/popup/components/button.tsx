// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'
import { cn } from '../../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none gap-2',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
        outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
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
