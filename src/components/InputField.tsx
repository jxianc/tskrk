import { useField } from 'formik'
import React, { HTMLInputTypeAttribute } from 'react'
import { cn } from '../utils/cn'

interface InputFieldProps {
  name: string
  label: string
  placeholder: string
  isPreviewLink?: boolean
  type: HTMLInputTypeAttribute
  required: boolean
}

// these are from Formik
interface FieldAndForm {
  field?: any
  form?: any
}

export const InputField: React.FC<InputFieldProps & FieldAndForm> = ({
  field: fieldFromProps,
  form,
  label,
  isPreviewLink,
  ...props
}) => {
  const [field, meta] = useField({ ...fieldFromProps, ...props })

  return (
    <div className="flex items-center space-x-2">
      <label className={cn(isPreviewLink ? 'text-blue-400' : 'text-black')}>
        {label}
      </label>
      <input
        {...field}
        {...props}
        className="w-full my-2 px-3 py-1 border-2 border-gray-200 placeholder-gray-400 focus:outline-none focus:border-gray-400  focus:z-10 text-sm rounded-[0.3rem]"
      />
    </div>
  )
}
