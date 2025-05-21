import { useState } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { InputType } from '../../shared/constants/enum/input'

interface TextFormFieldProps {
  label: string
  placeholder?: string
  register: UseFormRegisterReturn
  type?: InputType.TEXT | InputType.EMAIL | InputType.PASSWORD | InputType.NUMBER | InputType.TEXTAREA
  error?: string
  rows?: number
}

export const TextFormField = ({ label, placeholder = '', register, type = InputType.TEXT, error, rows = 3 }: TextFormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const inputType = type === InputType.PASSWORD ? (showPassword ? InputType.TEXT : InputType.PASSWORD) : type

  return (
    <div className="w-full space-y-2">
      <label
        htmlFor={register.name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <div className="relative">
        {type === InputType.TEXTAREA ? (
          <textarea
            id={register.name}
            placeholder={placeholder}
            rows={rows}
            className={`focus:outline-none w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-2 focus:ring-black`}
            {...register}
          />
        ) : (
          <>
            <input
              id={register.name}
              type={inputType}
              placeholder={placeholder}
              className={`focus:outline-none w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-2 focus:ring-black ${
                type === InputType.PASSWORD ? 'pr-10' : ''
              }`}
              {...register}
            />

            {type === InputType.PASSWORD && (
              <button
                type="button"
                className="focus:outline-none absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            )}
          </>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
