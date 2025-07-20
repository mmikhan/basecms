import { Access } from 'payload'

/**
 * Checks if the user is authenticated or if the document is published.
 *
 * If the user is authenticated, access is granted.
 *
 * If not authenticated, it checks if the document's status is 'published'.
 *
 * If the document is not published, access is denied.
 */

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
