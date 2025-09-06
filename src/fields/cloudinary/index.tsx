import { getCloudinaryFolders } from 'payload-storage-cloudinary'
import { CloudinaryField } from './field'

export async function selectField() {
  const folders = await getCloudinaryFolders()

  return <CloudinaryField folders={folders} />
}
