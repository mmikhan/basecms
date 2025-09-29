import { cn } from './utils'

export const spacingTopClasses = {
  none: 'mt-0',
  small: 'mt-8',
  medium: 'mt-16',
  large: 'mt-24',
}

export const spacingBottomClasses = {
  none: 'mb-0',
  small: 'mb-8',
  medium: 'mb-16',
  large: 'mb-24',
}

export const paddingTopClasses = {
  none: 'pt-0',
  small: 'pt-8',
  medium: 'pt-16',
  large: 'pt-24',
}

export const paddingBottomClasses = {
  none: 'pb-0',
  small: 'pb-8',
  medium: 'pb-16',
  large: 'pb-24',
}

export const getCenteringClasses = (alignment: 'left' | 'right' | 'full' | 'center' = 'center') => {
  return cn(
    alignment === 'left' || alignment === 'right'
      ? 'max-w-sm-half md:max-w-md-half lg:max-w-lg-half xl:max-w-xl-half 2xl:max-w-2xl-half'
      : '',
    alignment === 'left' ? 'ml-0 pl-0' : '',
    alignment === 'right' ? 'mr-0 pr-0' : '',
    alignment === 'full' ? 'max-w-none mx-0 px-0' : '',
  )
}
