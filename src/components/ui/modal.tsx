import { X } from 'lucide-react'
import { type ReactNode } from 'react'

interface IProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  description?: string
}

export const ModalWindow = ({ isOpen, onClose, children, title, description }: IProps) => {
  if (!isOpen) return null

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      />
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg dark:bg-black">
        <button
          onClick={onClose}
          className="ring-offset-background focus:outline-none focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>
        {(title || description) && (
          <div className="mb-4">
            {title && <h2 className="text-2xl font-bold">{title}</h2>}
            {description && <p className="text-gray-600">{description}</p>}
          </div>
        )}
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {children}
        </div>
      </div>
    </>
  )
}
