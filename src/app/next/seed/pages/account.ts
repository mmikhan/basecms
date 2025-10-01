import type { RequiredDataFromCollectionSlug } from 'payload'

export const accountPage: RequiredDataFromCollectionSlug<'dashboard'> = {
  _order: 'a0',
  title: 'Account',
  layout: [
    {
      title: 'Name',
      description: 'Manage your account name',
      blockName: null,
      blockType: 'accountName',
    },
    {
      title: 'Password',
      description: 'Manage your account password',
      blockName: null,
      blockType: 'accountPassword',
    },
  ],
  slug: 'account',
  _status: 'published',
}
