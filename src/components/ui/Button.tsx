import type { ReactNode } from 'react'

type IProps = {
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function Button({ type = 'button', children, className = '', onClick }: IProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`focus:outline-none cursor-pointer rounded-md px-4 py-2 font-medium ${className}`}
    >
      {children}
    </button>
  )
}
