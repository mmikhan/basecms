import type { Category } from '@/payload-types'
import type { RequiredDataFromCollectionSlug } from 'payload'

type carCategoryArgs = {
  parent?: Category
}

export const carCategory: (
  args: carCategoryArgs,
) => RequiredDataFromCollectionSlug<'categories'> = ({ parent }) => {
  return {
    title: 'Car',
    slug: 'car',
    parent,
  }
}
