import type { PaymentField } from '@payloadcms/plugin-form-builder/types'
import {
  useFormContext,
  type FieldErrorsImpl,
  type FieldValues,
  type UseFormRegister,
} from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Error } from './Error'
import { Width } from './Width'

export const Payment: React.FC<
  PaymentField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, basePrice, errors, label, register, required, width }) => {
  const { setValue } = useFormContext()
  setValue(name, basePrice ?? 0)

  return (
    <Width width={width} className="grid gap-2">
      <Label htmlFor={name}>
        {label}
        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input id={name} type="number" {...register(name, { required })} />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
