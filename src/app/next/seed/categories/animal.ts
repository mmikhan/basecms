import type { Category } from '@/payload-types'
import type { RequiredDataFromCollectionSlug } from 'payload'

type animalCategoryArgs = {
  parent?: Category
}

export const animalCategory: (
  args: animalCategoryArgs,
) => RequiredDataFromCollectionSlug<'categories'> = ({ parent }) => {
  return {
    title: 'Animal',
    slug: 'animal',
    parent,
  }
}
