import { Access } from 'payload'

/**
 * Grants access to anyone.
 * This function always returns true, allowing all requests to pass through.
 *
 */

export const anyone: Access = () => true
