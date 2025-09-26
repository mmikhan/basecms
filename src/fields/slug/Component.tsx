'use client'

import React, { useCallback, useEffect } from 'react'
import { TextFieldClientProps } from 'payload'

import {
  useField,
  Button,
  TextInput,
  FieldLabel,
  useFormFields,
  useForm,
  useDebounce,
} from '@payloadcms/ui'
import './index.scss'
import { slugify } from 'transliteration'

type SlugProps = {
  fieldToUse: string
  checkboxFieldPath: string
} & TextFieldClientProps

export const Slug: React.FC<SlugProps> = ({
  field,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  path,
  readOnly: readOnlyFromProps,
}) => {
  const { label } = field

  const checkboxFieldPath = path?.includes('.')
    ? `${path}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps

  const { value, setValue } = useField<string>({ path: path || field.name })

  const { dispatchFields } = useForm()

  // The value of the checkbox
  // We're using separate useFormFields to minimise re-renders
  const checkboxValue = useFormFields(([fields]) => {
    return fields[checkboxFieldPath]?.value as string
  })

  // The value of the field we're listening to for the slug
  const targetFieldValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string
  })

  const debouncedValue = useDebounce(targetFieldValue, 500)

  useEffect(() => {
    if (checkboxValue) {
      const formattedSlug = slugify(debouncedValue, { trim: true })

      if (value !== formattedSlug) setValue(formattedSlug)
    }
  }, [debouncedValue, checkboxValue, setValue, value])

  const handleLock = useCallback(
    (e: React.MouseEvent<Element>) => {
      e.preventDefault()

      dispatchFields({
        type: 'UPDATE',
        path: checkboxFieldPath,
        value: !checkboxValue,
      })
    },
    [checkboxValue, checkboxFieldPath, dispatchFields],
  )

  const readOnly = readOnlyFromProps || checkboxValue

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />

        <Button className="lock-button" buttonStyle="none" onClick={handleLock}>
          {checkboxValue ? 'Unlock' : 'Lock'}
        </Button>
      </div>

      <TextInput
        value={value}
        onChange={setValue}
        path={path || field.name}
        readOnly={Boolean(readOnly)}
      />
    </div>
  )
}
